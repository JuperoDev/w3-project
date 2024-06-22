<template>
    <div class="armyComposer_container">
      <!-- CHARACTER -->
      <div class="armyComposer_container_character bg-zinc-800 text-zinc-50 uppercase">
        Characters {{ totalCharacterPoints }} points
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
        <div v-for="(savedUnit, index) in savedUnits" :key="index" v-if="savedUnit.type === 'character'">
          {{ savedUnit.unitName }}: {{ savedUnit.basicPoints }} points
          <v-btn @click="deleteUnit(index)">Delete</v-btn>
          <div v-if="savedUnit.unitComposition" class="unit-composition-list">
            <div v-for="unit in savedUnit.unitComposition" :key="unit.unitType" class="unit-composition">
              <ArmyBuilderAdditionalData :url="url" :unit="unit" />
              <ArmyBuilderWarGearData :url="url" :unit="unit" :parentUnit="unit.parentUnit" @updateWargear="updateWargear(index, $event)" />
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
        <div v-for="(savedUnit, index) in savedUnits" :key="index" v-if="savedUnit.type === 'battleline'">
          {{ savedUnit.unitName }}: {{ savedUnit.basicPoints }} points
          <v-btn @click="deleteUnit(index)">Delete</v-btn>
          <div v-if="savedUnit.unitComposition" class="unit-composition-list">
            <div v-for="unit in savedUnit.unitComposition" :key="unit.unitType" class="unit-composition">
              <ArmyBuilderAdditionalData :url="url" :unit="unit" />
              <ArmyBuilderWarGearData :url="url" :unit="unit" :parentUnit="unit.parentUnit" @updateWargear="updateWargear(index, $event)" />
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
  import { ref, onMounted, computed, defineExpose } from 'vue';
  import { useArmyStore } from '@/stores/armyStore';
  
  const props = defineProps({
    url: String,
    armyIndex: Number
  });
  
  const emit = defineEmits(['add-unit']); // Declare the event here
  
  const isCharacterDialogOpen = ref(false);
  const isBattlelineDialogOpen = ref(false);
  const characters = ref([]);
  const battlelines = ref([]);
  const savedUnits = ref([]);
  const isSaving = ref(false); // Add this to prevent multiple saves
  
  const debounceTimers = {}; // Tracking object for unit debounce
  
  const armyStore = useArmyStore();
  
  const openCharacterDialog = () => {
    isCharacterDialogOpen.value = true;
  };
  
  const openBattlelineDialog = () => {
    isBattlelineDialogOpen.value = true;
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
  
      const newCharacter = { ...character, unitComposition: unitsWithParentUnit, type: 'character' };
      savedUnits.value.push(newCharacter);
      armyStore.addUnitToArmy(props.armyIndex, newCharacter);
      emit('add-unit', newCharacter);
    } catch (error) {
      console.error("Fetch Error: ", error);
      const newCharacter = { ...character, unitComposition: [], type: 'character' };
      savedUnits.value.push(newCharacter);
      armyStore.addUnitToArmy(props.armyIndex, newCharacter);
      emit('add-unit', newCharacter);
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
  
      const newBattleline = { ...battleline, unitComposition: unitsWithParentUnit, type: 'battleline' };
      savedUnits.value.push(newBattleline);
      armyStore.addUnitToArmy(props.armyIndex, newBattleline);
      emit('add-unit', newBattleline);
    } catch (error) {
      console.error("Fetch Error: ", error);
      const newBattleline = { ...battleline, unitComposition: [], type: 'battleline' };
      savedUnits.value.push(newBattleline);
      armyStore.addUnitToArmy(props.armyIndex, newBattleline);
      emit('add-unit', newBattleline);
    } finally {
      isSaving.value = false; // Reset saving state
    }
  };
  
  const deleteUnit = (index) => {
    savedUnits.value.splice(index, 1);
    armyStore.removeUnitFromArmy(props.armyIndex, index);
  };
  
  const loadUnits = (units) => {
    savedUnits.value = units;
  };
  
  const countInArmy = (unitName, type) => {
    return savedUnits.value.filter(unit => unit.unitName === unitName && unit.type === type).length;
  };
  
  const reloadUnits = async () => {
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
  
  const updateWargear = (index, wargear) => {
    const updatedUnits = savedUnits.value[index].unitComposition.map(unit => {
      unit.selectedWargear = wargear;
      return unit;
    });
    savedUnits.value[index].unitComposition = updatedUnits;
    armyStore.saveArmies();
  };
  
  onMounted(async () => {
    reloadUnits();
  });
  
  const totalCharacterPoints = computed(() => {
    return savedUnits.value
      .filter(unit => unit.type === 'character')
      .reduce((sum, character) => sum + character.basicPoints, 0);
  });
  
  const totalBattlelinePoints = computed(() => {
    return savedUnits.value
      .filter(unit => unit.type === 'battleline')
      .reduce((sum, battleline) => sum + battleline.basicPoints, 0);
  });
  
  // Expose the loadUnits and reloadUnits methods to be called from the parent
  defineExpose({ loadUnits, reloadUnits });
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