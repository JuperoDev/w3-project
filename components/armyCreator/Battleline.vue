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
        <li v-for="(unit, index) in army" :key="unit.id">
          {{ unit.unitName }} ({{ unit.basicPoints }} points)
          <v-btn icon small @click="() => debouncedRemoveUnit(unit.id)">
            <v-icon small>mdi-delete</v-icon>
          </v-btn>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
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

const addUnitToArmy = (unit) => {
  const uniqueId = generateUniqueId();
  const unitWithId = { ...unit, id: uniqueId };
  army.value.push(unitWithId);
  armyStore.addBattlelineUnitToArmy(props.armyIndex, unitWithId);
  console.log('Updated army:', army.value);
};

const removeUnitFromArmy = (id) => {
  const index = army.value.findIndex(unit => unit.id === id);
  if (index !== -1) {
    armyStore.removeBattlelineUnitFromArmy(props.armyIndex, id);
    army.value.splice(index, 1);
  }
};

const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
};

const debouncedRemoveUnit = debounce(removeUnitFromArmy, 300);

const loadUnits = () => {
  fetch(props.url)
    .then(response => response.json())
    .then(data => {
      units.value = data.battleline;
    });

  army.value = armyStore.loadBattlelineUnitsForArmy(props.armyIndex);
};

const generateUniqueId = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

onMounted(() => {
  loadUnits();
});

watch(() => props.armyIndex, loadUnits);
</script>

<style scoped>
</style>
