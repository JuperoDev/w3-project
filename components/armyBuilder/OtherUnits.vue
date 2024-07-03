<template>
    <div>
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
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { useArmyStore } from '@/stores/armyStore';
  
  const props = defineProps({
    url: String,
    armyIndex: Number,
    others: Array,
    savedCharacters: Array,
  });
  
  const emit = defineEmits(['updateSavedCharacters']);
  
  const isOtherDialogOpen = ref(false);
  
  const armyStore = useArmyStore();
  const isSaving = ref(false);
  
  const openOtherDialog = () => {
    isOtherDialogOpen.value = true;
  };
  
  const generateUniqueId = () => {
    return Math.floor(1000 + Math.random() * 9000);
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
      props.savedCharacters.push(newOther);
      armyStore.addCharacterToArmy(props.armyIndex, newOther);
      emit('updateSavedCharacters', props.savedCharacters);
    } catch (error) {
      console.error("Fetch Error: ", error);
      const newOther = { ...other, unitComposition: [], isBattleline: false, isOtherUnit: true, id: generateUniqueId(), isEpicHero: false };
      props.savedCharacters.push(newOther);
      armyStore.addCharacterToArmy(props.armyIndex, newOther);
      emit('updateSavedCharacters', props.savedCharacters);
    } finally {
      isSaving.value = false; // Reset saving state
    }
  };
  
  const deleteCharacter = (id) => {
    const targetIndex = props.savedCharacters.findIndex(character => character.id === id);
  
    if (targetIndex !== -1) {
      props.savedCharacters.splice(targetIndex, 1);
      armyStore.removeCharacterFromArmy(props.armyIndex, targetIndex);
      emit('updateSavedCharacters', props.savedCharacters);
    }
  };
  
  const openOptionsDialog = (unit) => {
    emit('openOptionsDialog', unit);
  };
  
  const countInArmy = (unitName, type) => {
    if (type === 'other') {
      return props.savedCharacters.filter(character => character.unitName === unitName && character.isOtherUnit).length;
    }
  };
  
  const updateWargear = (index, wargear, unitId) => {
    const targetUnit = props.savedCharacters.find(character => character.id === unitId);
    if (targetUnit) {
      targetUnit.unitComposition.forEach(unit => {
        unit.selectedWargear = wargear;
      });
      armyStore.saveArmies();
    }
  };
  
  const totalOtherPoints = computed(() => {
    return props.savedCharacters.filter(character => character.isOtherUnit).reduce((sum, other) => sum + other.basicPoints + (other.enhancementPoints || 0), 0);
  });
  </script>
  
  <style scoped>
  .saved-others {
    margin-top: 20px;
  }
  
  .saved-others div {
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
  