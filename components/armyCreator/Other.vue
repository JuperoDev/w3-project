<template>
  <div class="bg-gray-800 p-4 rounded-lg shadow-md text-white">
    <div class="flex justify-between items-center">
      <h2 class="text-lg font-semibold">Other</h2>
    </div>
    <p><strong>URL:</strong> {{ url }}</p>
    <UnitDialog 
      :title="'Select Other Units'" 
      :units="units" 
      :unitCounts="unitCounts"
      @add-unit="addUnitToArmy" 
    />
    <div v-if="army.length" class="mt-4">
      <h3 class="text-lg font-semibold">Army Units:</h3>
      <ul>
        <li v-for="unit in army" :key="unit.id" class="flex items-center">
          <span>{{ unit.unitName }} ({{ unit.basicPoints }} points)</span>
          <div class="flex ml-auto">
            <v-btn icon small @click="removeUnitFromArmy(unit.id)">
              <v-icon small>mdi-delete</v-icon>
            </v-btn>
            <UnitInfoDialog :url="constructUnitUrl(url, unit.unitName)" />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed, nextTick } from 'vue';
import { useArmyStorage } from '@/stores/armyStorage';
import UnitDialog from './UnitDialog.vue';
import UnitInfoDialog from './UnitInfoDialog.vue';

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
  army.value = armyStore.loadOtherUnitsForArmy(props.armyIndex);
};

const addUnitToArmy = async (unit) => {
  const uniqueId = generateUniqueId();
  const unitWithId = { ...unit, id: uniqueId };
  
  await nextTick();
  armyStore.addOtherUnitToArmy(props.armyIndex, unitWithId);
  syncArmyWithStore();
  
  console.log('Updated army:', army.value);
};

const removeUnitFromArmy = async (id) => {
  await nextTick();
  armyStore.removeOtherUnitFromArmy(props.armyIndex, id);
  syncArmyWithStore();
};

const loadUnits = () => {
  fetch(props.url)
    .then(response => response.json())
    .then(data => {
      units.value = data.other;
    });
  syncArmyWithStore();
};

const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const formattedUnitName = (unitName) => {
  return unitName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
};

const constructUnitUrl = (baseUrl, unitName) => {
  const sanitizedUnitName = formattedUnitName(unitName);
  const baseUrlParts = baseUrl.split('/');
  baseUrlParts.pop(); 
  return `${baseUrlParts.join('/')}/collection/${sanitizedUnitName}.json`;
};

onMounted(() => {
  loadUnits();
});

watch(() => props.armyIndex, loadUnits);
</script>