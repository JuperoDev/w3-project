<template>
  <div class="armyComposer_container">
    <!-- CHARACTER -->
    <div class="armyComposer_container_character bg-zinc-800 text-zinc-50 uppercase">
      character {{ totalCharacterPoints }} points
      <v-btn @click="openCharacterDialog">+</v-btn>
    </div>
    <p>passed prop: {{ url }}</p>

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
      <div v-for="(savedCharacter, index) in savedCharacters" :key="index">
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
      <div v-for="(savedBattleline, index) in savedBattlelines" :key="index">
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

const emit = defineEmits(['add-character']);

const isCharacterDialogOpen = ref(false);
const isBattlelineDialogOpen = ref(false);
const isOptionsDialogOpen = ref(false);
const characters = ref([]);
const battlelines = ref([]);
const savedCharacters = ref([]);
const savedBattlelines = ref([]);
const unitOptions = ref([]);
const selectedOption = ref(null);
const currentUnit = ref({});
const isSaving = ref(false); // Add this to prevent multiple saves

const armyStore = useArmyStore();

const openCharacterDialog = () => {
  isCharacterDialogOpen.value = true;
};

const openBattlelineDialog = () => {
  isBattlelineDialogOpen.value = true;
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

    const newCharacter = { ...character, unitComposition: unitsWithParentUnit };
    savedCharacters.value.push(newCharacter);
    armyStore.addCharacterToArmy(props.armyIndex, newCharacter);
    emit('add-character', newCharacter);
  } catch (error) {
    console.error("Fetch Error: ", error);
    const newCharacter = { ...character, unitComposition: [] };
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

    const newBattleline = { ...battleline, unitComposition: unitsWithParentUnit };
    savedBattlelines.value.push(newBattleline);
    armyStore.addBattlelineToArmy(props.armyIndex, newBattleline);
    emit('add-character', newBattleline);
  } catch (error) {
    console.error("Fetch Error: ", error);
    const newBattleline = { ...battleline, unitComposition: [] };
    savedBattlelines.value.push(newBattleline);
    armyStore.addBattlelineToArmy(props.armyIndex, newBattleline);
    emit('add-character', newBattleline);
  } finally {
    isSaving.value = false; // Reset saving state
  }
};

const deleteCharacter = (index, type) => {
  if (type === 'character') {
    savedCharacters.value.splice(index, 1);
    armyStore.removeCharacterFromArmy(props.armyIndex, index);
  } else if (type === 'battleline') {
    savedBattlelines.value.splice(index, 1);
    armyStore.removeBattlelineFromArmy(props.armyIndex, index);
  }
};

const loadCharacters = (characters) => {
  savedCharacters.value = characters;
};

const loadBattlelines = (battlelines) => {
  savedBattlelines.value = battlelines;
};

const countInArmy = (unitName, type) => {
  if (type === 'character') {
    return savedCharacters.value.filter(character => character.unitName === unitName).length;
  } else if (type === 'battleline') {
    return savedBattlelines.value.filter(battleline => battleline.unitName === unitName).length;
  }
};

const reloadCharacters = async () => {
  if (!props.url) return;
  try {
    const res = await fetch(`/faction/${props.url}/collection.json`);
    const data = await res.json();
    characters.value = data.characters;
    battlelines.value = data.battleline;
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
    isOptionsDialogOpen.value = false;
  }
};

onMounted(async () => {
  reloadCharacters();
});

const totalCharacterPoints = computed(() => {
  return savedCharacters.value.reduce((sum, character) => sum + character.basicPoints, 0);
});

const totalBattlelinePoints = computed(() => {
  return savedBattlelines.value.reduce((sum, battleline) => sum + battleline.basicPoints, 0);
});

const updateWargear = (index, wargear, type) => {
  if (type === 'character') {
    const updatedUnits = savedCharacters.value[index].unitComposition.map(unit => {
      unit.selectedWargear = wargear;
      return unit;
    });
    savedCharacters.value[index].unitComposition = updatedUnits;
  } else if (type === 'battleline') {
    const updatedUnits = savedBattlelines.value[index].unitComposition.map(unit => {
      unit.selectedWargear = wargear;
      return unit;
    });
    savedBattlelines.value[index].unitComposition = updatedUnits;
  }
  armyStore.saveArmies();
};

// Expose the loadCharacters, loadBattlelines and reloadCharacters methods to be called from the parent
defineExpose({ loadCharacters, reloadCharacters, loadBattlelines });
</script>

<style scoped>
.saved-characters, .saved-battlelines {
  margin-top: 20px;
}

.saved-characters h3, .saved-battlelines h3 {
  margin-bottom: 10px;
}

.saved-characters div, .saved-battlelines div {
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
