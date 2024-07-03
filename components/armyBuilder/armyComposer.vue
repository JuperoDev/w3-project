<template>
  <div class="armyComposer_container">
    <!-- Total Points -->
    <div class="total-points bg-zinc-700 text-zinc-50 uppercase">
      Total Points: {{ totalPoints }} points
    </div>

    <!-- CHARACTER -->
    <div class="armyComposer_container_character bg-zinc-700 text-zinc-50 uppercase">
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
      <div v-for="(savedCharacter, index) in savedCharacters.filter(character => !character.isBattleline && !character.isOtherUnit)" :key="savedCharacter.id">
        {{ savedCharacter.unitName }}: {{ savedCharacter.basicPoints }} points
        <v-btn @click="deleteCharacter(savedCharacter.id)">Delete</v-btn>
        <div v-if="savedCharacter.unitComposition" class="unit-composition-list">
          <div v-for="unit in savedCharacter.unitComposition" :key="unit.unitType" class="unit-composition">
            <ArmyBuilderAdditionalData :url="url" :unit="unit" />
            <ArmyBuilderWarGearData 
              :url="url" 
              :unit="unit" 
              :parentUnit="unit.parentUnit" 
              :unitId="savedCharacter.id" 
              @updateWargear="updateWargear(index, $event.wargear, $event.unitId)" 
            />
            <div>{{ unit.minQuantity }} x {{ unit.unitType }}:</div>
            <div v-for="equipment in unit.equipment" :key="equipment" class="equipment">
              - {{ equipment }}
            </div>
            <div v-if="!savedCharacter.isEpicHero">
              <v-btn @click="openEnhancementDialog(savedCharacter, index)">Enhancement</v-btn>
            </div>
            <div v-if="savedCharacter.enhancements" class="enhancements">
              Enhancement: {{ savedCharacter.enhancementName }} ({{ savedCharacter.enhancementPoints }} points)
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

    <!-- Enhancement Dialog -->
    <v-dialog v-model="isEnhancementDialogOpen" max-width="800" min-width="380">
      <template v-slot:default="{ isActive }">
        <v-card>
          <v-card-title>Enhancements</v-card-title>
          <v-card-text>
            <div v-if="enhancements.length">
              <v-radio-group v-model="selectedEnhancement" class="my-2">
                <v-radio
                  v-for="(enhancement, index) in enhancements"
                  :key="index"
                  :label="`${enhancement.name} (${enhancement.points} points)`"
                  :value="enhancement"
                  @click="handleRadioClick(enhancement)"
                ></v-radio>
              </v-radio-group>
            </div>
            <div v-else>
              No enhancements found.
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text="Close" @click="isEnhancementDialogOpen = false">Close</v-btn>
            <v-btn text="Save" @click="saveEnhancement">Save</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>

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
      <div v-for="(savedBattleline, index) in savedCharacters.filter(character => character.isBattleline)" :key="savedBattleline.id">
        {{ savedBattleline.unitName }}: {{ savedBattleline.basicPoints }} points
        <v-btn @click="deleteCharacter(savedBattleline.id)">Delete</v-btn>
        <v-btn @click="openOptionsDialog(savedBattleline)">Options</v-btn>
        <div v-if="savedBattleline.unitComposition" class="unit-composition-list">
          <div v-for="unit in savedBattleline.unitComposition" :key="unit.unitType" class="unit-composition">
            <ArmyBuilderAdditionalData :url="url" :unit="unit" />
            <ArmyBuilderWarGearData 
              :url="url" 
              :unit="unit" 
              :parentUnit="unit.parentUnit" 
              :unitId="savedBattleline.id" 
              @updateWargear="updateWargear(index, $event.wargear, $event.unitId)" 
            />
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
      <div v-for="(savedOther, index) in savedCharacters.filter(character => character.isOtherUnit)" :key="savedOther.id">
        {{ savedOther.unitName }}: {{ savedOther.basicPoints }} points
        <v-btn @click="deleteCharacter(savedOther.id)">Delete</v-btn>
        <v-btn @click="openOptionsDialog(savedOther)">Options</v-btn>
        <div v-if="savedOther.unitComposition" class="unit-composition-list">
          <div v-for="unit in savedOther.unitComposition" :key="unit.unitType" class="unit-composition">
            <ArmyBuilderAdditionalData :url="url" :unit="unit" />
            <ArmyBuilderWarGearData 
              :url="url" 
              :unit="unit" 
              :parentUnit="unit.parentUnit" 
              :unitId="savedOther.id" 
              @updateWargear="updateWargear(index, $event.wargear, $event.unitId)" 
            />
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

    <!-- Options Dialog Component -->
    <ArmyBuilderOptionsDialog
      :isOpen="isOptionsDialogOpen"
      :unitOptions="unitOptions"
      :currentUnit="currentUnit"
      :selectedOption="selectedOption"
      @update:isOpen="isOptionsDialogOpen = $event"
      @update:selectedOption="selectedOption = $event"
      @save-option="saveOption"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed, defineExpose, watch } from 'vue';
import { useArmyStore } from '@/stores/armyStore';

const props = defineProps({
  url: String,
  armyIndex: Number,
  detachment: String,
});

const emit = defineEmits(['add-character']); // Declare the events here

const isCharacterDialogOpen = ref(false);
const isBattlelineDialogOpen = ref(false);
const isOtherDialogOpen = ref(false);
const isEnhancementDialogOpen = ref(false);
const isOptionsDialogOpen = ref(false);

const characters = ref([]);
const battlelines = ref([]);
const others = ref([]);
const savedCharacters = ref([]);
const unitOptions = ref([]);
const selectedOption = ref(null);
const currentUnit = ref({});
const isSaving = ref(false); // Add this to prevent multiple saves
const enhancements = ref([]); // Store enhancements
const selectedEnhancement = ref(null);
const expandedPanels = ref([]); // Ensure expandedPanels is initialized as an empty array
let currentCharacterIndex = ref(null);

const armyStore = useArmyStore();

// Fetch enhancements data based on the detachment
const fetchEnhancements = async () => {
  try {
    const res = await fetch(`/faction/${props.url}/detachment/${props.detachment.toLowerCase().replace(/\s+/g, '-')}.json`);
    const data = await res.json();
    enhancements.value = data.enhacements || [];
  } catch (error) {
    console.error("Fetch Error: ", error);
  }
};

// Call fetchEnhancements when the component is mounted
onMounted(async () => {
  reloadCharacters();
  fetchEnhancements();
});

// Watch the armyIndex prop to refetch enhancements when it changes
watch(() => props.armyIndex, async (newIndex, oldIndex) => {
  if (newIndex !== oldIndex) {
    fetchEnhancements();
  }
});

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

const openEnhancementDialog = (character, index) => {
  currentCharacterIndex.value = index;
  selectedEnhancement.value = character.enhancements || null;
  expandedPanels.value = []; // Reset expanded panels when the dialog is opened
  console.log('Opening enhancement dialog for:', character);
  console.log('Selected enhancement:', selectedEnhancement.value);
  isEnhancementDialogOpen.value = true;
};

const generateUniqueId = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

const saveCharacter = async (character) => {
  if (isSaving.value) return; // Prevent further clicks while saving
  isSaving.value = true;

  const characterJsonFileName = character.unitName.replace(/\s+/g, '-').toLowerCase() + '.json';

  try {
    const res = await fetch(`/faction/${props.url}/collection/${characterJsonFileName}`);
    const data = await res.json();
    character.keywords = data.keywords || [];
    const isEpicHero = character.keywords.includes('epic hero');
    const unitComposition = data.unitComposition || [];

    const unitsWithParentUnit = unitComposition.map(unit => ({
      ...unit,
      parentUnit: character.unitName,
      selectedWargear: []
    }));

    const newCharacter = { ...character, unitComposition: unitsWithParentUnit, isBattleline: false, isOtherUnit: false, id: generateUniqueId(), isEpicHero: isEpicHero };
    savedCharacters.value.push(newCharacter);
    armyStore.addCharacterToArmy(props.armyIndex, newCharacter);
    emit('add-character', newCharacter);
  } catch (error) {
    console.error("Fetch Error: ", error);
    const newCharacter = { ...character, unitComposition: [], isBattleline: false, isOtherUnit: false, id: generateUniqueId(), isEpicHero: false };
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
    battleline.keywords = data.keywords || [];
    const isEpicHero = battleline.keywords.includes('epic hero');
    const unitComposition = data.unitComposition || [];

    const unitsWithParentUnit = unitComposition.map(unit => ({
      ...unit,
      parentUnit: battleline.unitName,
      selectedWargear: []
    }));

    const newBattleline = { ...battleline, unitComposition: unitsWithParentUnit, isBattleline: true, isOtherUnit: false, id: generateUniqueId(), isEpicHero: isEpicHero };
    savedCharacters.value.push(newBattleline);
    armyStore.addCharacterToArmy(props.armyIndex, newBattleline);
    emit('add-character', newBattleline);
  } catch (error) {
    console.error("Fetch Error: ", error);
    const newBattleline = { ...battleline, unitComposition: [], isBattleline: true, isOtherUnit: false, id: generateUniqueId(), isEpicHero: false };
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
    other.keywords = data.keywords || [];
    const isEpicHero = other.keywords.includes('epic hero');
    const unitComposition = data.unitComposition || [];

    const unitsWithParentUnit = unitComposition.map(unit => ({
      ...unit,
      parentUnit: other.unitName,
      selectedWargear: []
    }));

    const newOther = { ...other, unitComposition: unitsWithParentUnit, isBattleline: false, isOtherUnit: true, id: generateUniqueId(), isEpicHero: isEpicHero };
    savedCharacters.value.push(newOther);
    armyStore.addCharacterToArmy(props.armyIndex, newOther);
    emit('add-character', newOther);
  } catch (error) {
    console.error("Fetch Error: ", error);
    const newOther = { ...other, unitComposition: [], isBattleline: false, isOtherUnit: true, id: generateUniqueId(), isEpicHero: false };
    savedCharacters.value.push(newOther);
    armyStore.addCharacterToArmy(props.armyIndex, newOther);
    emit('add-character', newOther);
  } finally {
    isSaving.value = false; // Reset saving state
  }
};

const deleteCharacter = (id) => {
  const targetIndex = savedCharacters.value.findIndex(character => character.id === id);

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

const saveOption = (selectedOption) => {
  if (selectedOption) {
    currentUnit.value.basicPoints = selectedOption.points;
    currentUnit.value.unitComposition[0].minQuantity = selectedOption.count[0];
    isOptionsDialogOpen.value = false;
  }
};

const totalCharacterPoints = computed(() => {
  return savedCharacters.value.filter(character => !character.isBattleline && !character.isOtherUnit).reduce((sum, character) => sum + character.basicPoints + (character.enhancementPoints || 0), 0);
});

const totalBattlelinePoints = computed(() => {
  return savedCharacters.value.filter(character => character.isBattleline).reduce((sum, battleline) => sum + battleline.basicPoints + (battleline.enhancementPoints || 0), 0);
});

const totalOtherPoints = computed(() => {
  return savedCharacters.value.filter(character => character.isOtherUnit).reduce((sum, other) => sum + other.basicPoints + (other.enhancementPoints || 0), 0);
});

const totalPoints = computed(() => {
  return totalCharacterPoints.value + totalBattlelinePoints.value + totalOtherPoints.value;
});

const updateWargear = (index, wargear, unitId) => {
  const targetUnit = savedCharacters.value.find(character => character.id === unitId);
  if (targetUnit) {
    targetUnit.unitComposition.forEach(unit => {
      unit.selectedWargear = wargear;
    });
    armyStore.saveArmies();
  }
};

const handleRadioClick = (enhancement) => {
  if (selectedEnhancement.value === enhancement) {
    selectedEnhancement.value = null;
  } else {
    selectedEnhancement.value = enhancement;
  }
};

const saveEnhancement = () => {
  const index = currentCharacterIndex.value;
  if (selectedEnhancement.value) {
    savedCharacters.value[index].enhancements = selectedEnhancement.value;
    savedCharacters.value[index].enhancementPoints = selectedEnhancement.value.points;
    savedCharacters.value[index].enhancementName = selectedEnhancement.value.name; // Add this line to store the enhancement name
    armyStore.updateCharacterEnhancement(props.armyIndex, index, selectedEnhancement.value);
  } else {
    savedCharacters.value[index].enhancements = null;
    savedCharacters.value[index].enhancementPoints = 0;
    savedCharacters.value[index].enhancementName = ''; // Reset the enhancement name
    armyStore.updateCharacterEnhancement(props.armyIndex, index, { name: '', points: 0 });
  }
  armyStore.saveArmies();
  isEnhancementDialogOpen.value = false;
};

// Expose the loadCharacters, reloadCharacters, loadBattlelines, loadOthers methods to be called from the parent
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

.enhancements {
  margin-top: 10px;
  font-size: 0.875rem;
  color: #000;
}
</style>
