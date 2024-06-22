<template>
  <div class="armyComposer_container">
    <!-- CHARACTER -->
    <div class="armyComposer_container_character bg-zinc-800 text-zinc-50 uppercase">
      character {{ totalCharacterPoints }} points
      <v-btn @click="openCharacterDialog">+</v-btn>
    </div>

    <!-- Character Dialog -->
    <v-dialog v-model="isCharacterDialogOpen" max-width="800" min-width="380" height="600">
      <template v-slot:default="{ isActive }">
        <v-card title="Select Character">
          <v-card-text>
            <div v-for="character in characters" :key="character.unitName">
              {{ character.unitName }}: {{ character.basicPoints }} points
              <div class="text-sm text-gray-500">Count in army: {{ countInArmy(character.unitName, 'character') }}</div>
              <v-btn :id="'add-' + character.unitName" @click="saveCharacter(character)">Add</v-btn>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text="Close" @click="isCharacterDialogOpen = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>

    <div class="saved-characters">
      <div v-for="(savedCharacter, index) in savedCharacters.filter(character => !character.isBattleline && !character.isOtherUnit)" :key="index">
        {{ savedCharacter.unitName }}: {{ savedCharacter.basicPoints }} points
        <v-btn @click="deleteCharacter(index, 'character')">Delete</v-btn>
        <div v-if="savedCharacter.unitComposition" class="unit-composition-list">
          <div v-for="unit in savedCharacter.unitComposition" :key="unit.unitType" class="unit-composition">
            <ArmyBuilderAdditionalData :url="url" :unit="unit" />
            <ArmyBuilderWarGearData :url="url" :unit="unit" :parentUnit="unit.parentUnit" @updateWargear="updateWargear(index, $event, 'character')" />
            <div>{{ unit.minQuantity }} x {{ unit.unitType }}:</div>
            <div v-for="equipment in unit.equipment" :key="equipment" class="equipment">
              - {{ equipment }}
            </div>
            <div v-if="unit.selectedWargear && unit.selectedWargear.length" class="selected-wargear">
              <div v-for="gear in unit.selectedWargear" :key="gear.item">
                {{ gear.item }} x{{ gear.amount }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- BATTLELINE -->
    <div class="armyComposer_container_battleline bg-zinc-800 text-zinc-50 uppercase">
      Battleline {{ totalBattlelinePoints }} points
      <v-btn @click="openBattlelineDialog">+</v-btn>
    </div>

    <!-- Battleline Dialog -->
    <v-dialog v-model="isBattlelineDialogOpen" max-width="800" min-width="380" height="600">
      <template v-slot:default="{ isActive }">
        <v-card title="Select Battleline">
          <v-card-text>
            <div v-for="battleline in battlelines" :key="battleline.unitName">
              {{ battleline.unitName }}: {{ battleline.basicPoints }} points
              <div class="text-sm text-gray-500">Count in army: {{ countInArmy(battleline.unitName, 'battleline') }}</div>
              <v-btn :id="'add-' + battleline.unitName" @click="saveBattleline(battleline)">Add</v-btn>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text="Close" @click="isBattlelineDialogOpen = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>

    <div class="saved-battlelines">
      <div v-for="(savedBattleline, index) in savedCharacters.filter(character => character.isBattleline)" :key="index">
        {{ savedBattleline.unitName }}: {{ savedBattleline.basicPoints }} points
        <v-btn @click="deleteCharacter(index, 'battleline')">Delete</v-btn>
        <v-btn @click="openOptionsDialog(savedBattleline)">Options</v-btn>
        <div v-if="savedBattleline.unitComposition" class="unit-composition-list">
          <div v-for="unit in savedBattleline.unitComposition" :key="unit.unitType" class="unit-composition">
            <ArmyBuilderAdditionalData :url="url" :unit="unit" />
            <ArmyBuilderWarGearData :url="url" :unit="unit" :parentUnit="unit.parentUnit" @updateWargear="updateWargear(index, $event, 'battleline')" />
            <div>{{ unit.minQuantity }} x {{ unit.unitType }}:</div>
            <div v-for="equipment in unit.equipment" :key="equipment" class="equipment">
              - {{ equipment }}
            </div>
            <div v-if="unit.selectedWargear && unit.selectedWargear.length" class="selected-wargear">
              <div v-for="gear in unit.selectedWargear" :key="gear.item">
                {{ gear.item }} x{{ gear.amount }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- OTHER UNITS -->
    <div class="armyComposer_container_other bg-zinc-800 text-zinc-50 uppercase">
      Other Units {{ totalOtherPoints }} points
      <v-btn @click="openOtherDialog">+</v-btn>
    </div>

    <!-- Other Dialog -->
    <v-dialog v-model="isOtherDialogOpen" max-width="800" min-width="380" height="600">
      <template v-slot:default="{ isActive }">
        <v-card title="Select Other Unit">
          <v-card-text>
            <div v-for="other in others" :key="other.unitName">
              {{ other.unitName }}: {{ other.basicPoints }} points
              <div class="text-sm text-gray-500">Count in army: {{ countInArmy(other.unitName, 'other') }}</div>
              <v-btn :id="'add-' + other.unitName" @click="saveOtherUnit(other)">Add</v-btn>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text="Close" @click="isOtherDialogOpen = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>

    <div class="saved-others">
      <div v-for="(savedOther, index) in savedCharacters.filter(character => character.isOtherUnit)" :key="index">
        {{ savedOther.unitName }}: {{ savedOther.basicPoints }} points
        <v-btn @click="deleteCharacter(index, 'other')">Delete</v-btn>
        <v-btn @click="openOptionsDialog(savedOther)">Options</v-btn>
        <div v-if="savedOther.unitComposition" class="unit-composition-list">
          <div v-for="unit in savedOther.unitComposition" :key="unit.unitType" class="unit-composition">
            <ArmyBuilderAdditionalData :url="url" :unit="unit" />
            <ArmyBuilderWarGearData :url="url" :unit="unit" :parentUnit="unit.parentUnit" @updateWargear="updateWargear(index, $event, 'other')" />
            <div>{{ unit.minQuantity }} x {{ unit.unitType }}:</div>
            <div v-for="equipment in unit.equipment" :key="equipment" class="equipment">
              - {{ equipment }}
            </div>
            <div v-if="unit.selectedWargear && unit.selectedWargear.length" class="selected-wargear">
              <div v-for="gear in unit.selectedWargear" :key="gear.item">
                {{ gear.item }} x{{ gear.amount }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Options Dialog -->
    <v-dialog v-model="isOptionsDialogOpen" max-width="800" min-width="380" height="600">
      <template v-slot:default="{ isActive }">
        <v-card title="Unit Options">
          <v-card-text>
            <div v-for="option in unitOptions" :key="option.count[0]">
              <v-radio-group v-model="selectedOption" :label="`Choose ${currentUnit.unitName} option`">
                <v-radio
                  :label="`${option.count[0]} models for ${option.points} points`"
                  :value="option"
                ></v-radio>
              </v-radio-group>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text="Close" @click="isOptionsDialogOpen = false">Close</v-btn>
            <v-btn text="Save" @click="saveOption">Save</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, defineExpose } from 'vue';
import { useArmyStore } from '@/stores/armyStore';

const props = defineProps({
  url: String,
  armyIndex: Number
});

const emit = defineEmits(['add-character', 'add-other']); // Declare the events here

const isCharacterDialogOpen = ref(false);
const isBattlelineDialogOpen = ref(false);
const isOtherDialogOpen = ref(false);
const isOptionsDialogOpen = ref(false);
const characters = ref([]);
const battlelines = ref([]);
const others = ref([]);
const savedCharacters = ref([]);
const unitOptions = ref([]);
const selectedOption = ref(null);
const currentUnit = ref({});
const isSaving = ref(false); // Add this to prevent multiple saves

const debounceTimers = {}; // Tracking object for unit debounce

const armyStore = useArmyStore();

const openCharacterDialog = () => {
  isCharacterDialogOpen.value = true;
};

const openBattlelineDialog = () => {
  isBattlelineDialogOpen.value = true;
};

const openOtherDialog = () => {
  isOtherDialogOpen.value = true;
};

const openOptionsDialog = (unit) => {
  currentUnit.value = unit;
  loadUnitOptions(unit.unitName);
  isOptionsDialogOpen.value = true;
};

const saveCharacter = async (character) => {
  if (isSaving.value) return; // Prevent further clicks while saving
  isSaving.value = true;

  const characterJsonFileName = character.unitName.replace(/\s+/g, '-').toLowerCase() + '.json';

  try {
    const res = await fetch(`/faction/${props.url}/collection/${characterJsonFileName}`);
    const data = await res.json();
    const unitComposition = data.unitComposition || [];

    const unitsWithParentUnit = unitComposition.map(unit => ({
      ...unit,
      parentUnit: character.unitName,
      selectedWargear: []
    }));

    const newCharacter = { ...character, unitComposition: unitsWithParentUnit, isBattleline: false, isOtherUnit: false };
    savedCharacters.value.push(newCharacter);
    armyStore.addCharacterToArmy(props.armyIndex, newCharacter);
    emit('add-character', newCharacter);
  } catch (error) {
    console.error("Fetch Error: ", error);
    const newCharacter = { ...character, unitComposition: [], isBattleline: false, isOtherUnit: false };
    savedCharacters.value.push(newCharacter);
    armyStore.addCharacterToArmy(props.armyIndex, newCharacter);
    emit('add-character', newCharacter);
  } finally {
    isSaving.value = false; // Reset saving state
  }
};

const saveBattleline = async (battleline) => {
  if (isSaving.value) return; // Prevent further clicks while saving
  isSaving.value = true;

  const battlelineJsonFileName = battleline.unitName.replace(/\s+/g, '-').toLowerCase() + '.json';

  try {
    const res = await fetch(`/faction/${props.url}/collection/${battlelineJsonFileName}`);
    const data = await res.json();
    const unitComposition = data.unitComposition || [];

    const unitsWithParentUnit = unitComposition.map(unit => ({
      ...unit,
      parentUnit: battleline.unitName,
      selectedWargear: []
    }));

    const newBattleline = { ...battleline, unitComposition: unitsWithParentUnit, isBattleline: true, isOtherUnit: false };
    savedCharacters.value.push(newBattleline);
    armyStore.addCharacterToArmy(props.armyIndex, newBattleline);
    emit('add-character', newBattleline);
  } catch (error) {
    console.error("Fetch Error: ", error);
    const newBattleline = { ...battleline, unitComposition: [], isBattleline: true, isOtherUnit: false };
    savedCharacters.value.push(newBattleline);
    armyStore.addCharacterToArmy(props.armyIndex, newBattleline);
    emit('add-character', newBattleline);
  } finally {
    isSaving.value = false; // Reset saving state
  }
};

const saveOtherUnit = async (other) => {
  if (isSaving.value) return; // Prevent further clicks while saving
  isSaving.value = true;

  const otherJsonFileName = other.unitName.replace(/\s+/g, '-').toLowerCase() + '.json';

  try {
    const res = await fetch(`/faction/${props.url}/collection/${otherJsonFileName}`);
    const data = await res.json();
    const unitComposition = data.unitComposition || [];

    const unitsWithParentUnit = unitComposition.map(unit => ({
      ...unit,
      parentUnit: other.unitName,
      selectedWargear: []
    }));

    const newOther = { ...other, unitComposition: unitsWithParentUnit, isBattleline: false, isOtherUnit: true };
    savedCharacters.value.push(newOther);
    armyStore.addCharacterToArmy(props.armyIndex, newOther);
    emit('add-character', newOther);
  } catch (error) {
    console.error("Fetch Error: ", error);
    const newOther = { ...other, unitComposition: [], isBattleline: false, isOtherUnit: true };
    savedCharacters.value.push(newOther);
    armyStore.addCharacterToArmy(props.armyIndex, newOther);
    emit('add-character', newOther);
  } finally {
    isSaving.value = false; // Reset saving state
  }
};

const deleteCharacter = (index, type) => {
  let targetIndex;

  if (type === 'character') {
    targetIndex = savedCharacters.value.findIndex((character, idx) => idx === index && !character.isBattleline && !character.isOtherUnit);
  } else if (type === 'battleline') {
    targetIndex = savedCharacters.value.findIndex((character, idx) => idx === index && character.isBattleline);
  } else if (type === 'other') {
    targetIndex = savedCharacters.value.findIndex((character, idx) => idx === index && character.isOtherUnit);
  }

  if (targetIndex !== -1) {
    savedCharacters.value.splice(targetIndex, 1);
    armyStore.removeCharacterFromArmy(props.armyIndex, targetIndex);
  }
};

const deleteOther = (index) => {
  const targetIndex = savedCharacters.value.findIndex((character, idx) => idx === index && character.isOtherUnit);

  if (targetIndex !== -1) {
    savedCharacters.value.splice(targetIndex, 1);
    armyStore.removeCharacterFromArmy(props.armyIndex, targetIndex);
  }
};

const loadCharacters = (characters) => {
  savedCharacters.value = characters;
};

const loadBattlelines = (battlelines) => {
  savedCharacters.value = savedCharacters.value.concat(battlelines);
};

const loadOthers = (others) => {
  savedCharacters.value = savedCharacters.value.concat(others);
};

const countInArmy = (unitName, type) => {
  if (type === 'character') {
    return savedCharacters.value.filter(character => character.unitName === unitName && !character.isBattleline && !character.isOtherUnit).length;
  } else if (type === 'battleline') {
    return savedCharacters.value.filter(character => character.unitName === unitName && character.isBattleline).length;
  } else if (type === 'other') {
    return savedCharacters.value.filter(character => character.unitName === unitName && character.isOtherUnit).length;
  }
};

const reloadCharacters = async () => {
  if (!props.url) return;
  try {
    const res = await fetch(`/faction/${props.url}/collection.json`);
    const data = await res.json();
    characters.value = data.characters;
    battlelines.value = data.battleline;
    others.value = data.other;
  } catch (error) {
    console.error("Fetch Error: ", error);
  }
};

const loadUnitOptions = async (unitName) => {
  try {
    const res = await fetch(`/faction/${props.url}/collection/${unitName.replace(/\s+/g, '-').toLowerCase()}.json`);
    const data = await res.json();
    unitOptions.value = data.options || [];
  } catch (error) {
    console.error("Fetch Error: ", error);
  }
};

const saveOption = () => {
  if (selectedOption.value) {
    currentUnit.value.basicPoints = selectedOption.value.points;
    currentUnit.value.unitComposition[0].minQuantity = selectedOption.value.count[0];
    isOptionsDialogOpen.value = false;
  }
};

onMounted(async () => {
  reloadCharacters();
});

const totalCharacterPoints = computed(() => {
  return savedCharacters.value.filter(character => !character.isBattleline && !character.isOtherUnit).reduce((sum, character) => sum + character.basicPoints, 0);
});

const totalBattlelinePoints = computed(() => {
  return savedCharacters.value.filter(character => character.isBattleline).reduce((sum, battleline) => sum + battleline.basicPoints, 0);
});

const totalOtherPoints = computed(() => {
  return savedCharacters.value.filter(character => character.isOtherUnit).reduce((sum, other) => sum + other.basicPoints, 0);
});

const updateWargear = (index, wargear, type) => {
  if (type === 'character') {
    const updatedUnits = savedCharacters.value[index].unitComposition.map(unit => {
      unit.selectedWargear = wargear;
      return unit;
    });
    savedCharacters.value[index].unitComposition = updatedUnits;
  } else if (type === 'battleline') {
    const updatedUnits = savedCharacters.value[index].unitComposition.map(unit => {
      unit.selectedWargear = wargear;
      return unit;
    });
    savedCharacters.value[index].unitComposition = updatedUnits;
  } else if (type === 'other') {
    const updatedUnits = savedCharacters.value[index].unitComposition.map(unit => {
      unit.selectedWargear = wargear;
      return unit;
    });
    savedCharacters.value[index].unitComposition = updatedUnits;
  }
  armyStore.saveArmies();
};

// Expose the loadCharacters, loadBattlelines, loadOthers, reloadCharacters methods to be called from the parent
defineExpose({ loadCharacters, reloadCharacters, loadBattlelines, loadOthers });
</script>


<style scoped>
.saved-characters, .saved-battlelines, .saved-others {
  margin-top: 20px;
}

.saved-characters h3, .saved-battlelines h3, .saved-others h3 {
  margin-bottom: 10px;
}

.saved-characters div, .saved-battlelines div, .saved-others div {
  margin-bottom: 5px;
}

.unit-composition-list {
  margin-top: 10px;
  padding-left: 15px;
}

.unit-composition {
  font-size: 0.875rem;
  color: #555;
  margin-top: 5px;
}

.equipment {
  font-size: 0.875rem;
  color: #555;
  margin-left: 10px;
}

.selected-wargear {
  margin-top: 10px;
  font-size: 0.875rem;
  color: #000;
}

.text-sm {
  font-size: 0.875rem;
}

.text-gray-500 {
  color: #6b7280;
}
</style>