<template>
    <div class="armyComposer_container_character">
        <div class="armyComposer_container_character__nav bg-zinc-700 text-zinc-50 uppercase">
      Character {{ totalCharacterPoints }} points
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
                @updateWargear="updateWargear($event.wargear, $event.unitId)" 
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
  const isEnhancementDialogOpen = ref(false);
  const characters = ref([]);
  const savedCharacters = ref([]);
  const enhancements = ref([]); // Store enhancements
  const selectedEnhancement = ref(null);
  const expandedPanels = ref([]); // Ensure expandedPanels is initialized as an empty array
  let currentCharacterIndex = ref(null);
  const isSaving = ref(false); // Add this to prevent multiple saves
  
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
  
  const deleteCharacter = (id) => {
    const targetIndex = savedCharacters.value.findIndex(character => character.id === id);
  
    if (targetIndex !== -1) {
      savedCharacters.value.splice(targetIndex, 1);
      armyStore.removeCharacterFromArmy(props.armyIndex, targetIndex);
    }
  };
  
  const reloadCharacters = async () => {
    if (!props.url) return;
    try {
      const res = await fetch(`/faction/${props.url}/collection.json`);
      const data = await res.json();
      characters.value = data.characters;
    } catch (error) {
      console.error("Fetch Error: ", error);
    }
  };
  
  const countInArmy = (unitName) => {
    return savedCharacters.value.filter(character => character.unitName === unitName && !character.isBattleline && !character.isOtherUnit).length;
  };
  
  const updateWargear = (wargear, unitId) => {
    const targetUnit = savedCharacters.value.find(character => character.id === unitId);
    if (targetUnit) {
      targetUnit.unitComposition.forEach(unit => {
        const matchingWargear = wargear.filter(w => w.miniature.toLowerCase() === unit.unitType.toLowerCase());
        if (matchingWargear.length > 0) {
          unit.selectedWargear = matchingWargear;
        }
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
  
  // Expose the reloadCharacters method to be called from the parent
  defineExpose({ reloadCharacters });
  
  const totalCharacterPoints = computed(() => {
    return savedCharacters.value.filter(character => !character.isBattleline && !character.isOtherUnit).reduce((sum, character) => sum + character.basicPoints + (character.enhancementPoints || 0), 0);
  });
  </script>
  
  <style scoped>
  .saved-characters {
    margin-top: 20px;
  }
  
  .saved-characters h3 {
    margin-bottom: 10px;
  }
  
  .saved-characters div {
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
  