<template>
  <div class="bg-gray-800 p-4 rounded-lg shadow-md text-white">
    <div class="flex justify-between items-center">
      <h2 class="text-lg font-semibold">Battleline</h2>
    </div>
    <p><strong>URL:</strong> {{ url }}</p>
    <UnitDialog 
      :title="'Select Battleline'" 
      :units="units" 
      :unitCounts="unitCounts"
      @add-unit="addUnitToArmy" 
    />
    <div v-if="army.length" class="mt-4">
      <h3 class="text-lg font-semibold">Army Units:</h3>
      <ul>
        <li v-for="unit in army" :key="unit.id">
          {{ unit.unitName }} ({{ unit.basicPoints }} points)
          <v-btn icon small @click="removeUnitFromArmy(unit.id)">
            <v-icon small>mdi-delete</v-icon>
          </v-btn>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed, nextTick } from 'vue';
import { useArmyStorage } from '@/stores/armyStorage';
import UnitDialog from './UnitDialog.vue';

const props = defineProps({
  url: {
    type: String,
    required: true
  },
  armyIndex: {
    type: Number,
    required: true
  }
});

const units = ref([]);
const army = ref([]);
const armyStore = useArmyStorage();

const unitCounts = computed(() => {
  const counts = {};
  army.value.forEach(unit => {
    counts[unit.unitName] = (counts[unit.unitName] || 0) + 1;
  });
  return counts;
});

const syncArmyWithStore = () => {
  army.value = armyStore.loadBattlelineUnitsForArmy(props.armyIndex);
};

const addUnitToArmy = async (unit) => {
  const uniqueId = Date.now().toString(36) + Math.random().toString(36).substr(2);
  const unitWithId = { ...unit, id: uniqueId };
  
  await nextTick();
  armyStore.addBattlelineUnitToArmy(props.armyIndex, unitWithId);
  syncArmyWithStore();
  
  console.log('Updated army:', army.value);
};

const removeUnitFromArmy = async (id) => {
  await nextTick();
  armyStore.removeBattlelineUnitFromArmy(props.armyIndex, id);
  syncArmyWithStore();
};

const loadUnits = () => {
  fetch(props.url)
    .then(response => response.json())
    .then(data => {
      units.value = data.battleline;
    });
  syncArmyWithStore();
};

onMounted(() => {
  loadUnits();
});

watch(() => props.armyIndex, loadUnits);
</script>