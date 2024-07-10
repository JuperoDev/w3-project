<template>
  <div class="bg-gray-800 p-4 rounded-lg shadow-md text-white">
    <div class="flex justify-between items-center">
      <h2 class="text-lg font-semibold">Characters</h2>
      <span>Total Points: {{ totalPoints }}</span>
    </div>

    <UnitDialog 
      :title="'Select Characters'" 
      :units="units" 
      :unitCounts="unitCounts"
      @add-unit="addUnitToArmy" 
    />
    <div v-if="army.length" class="mt-4">
      <h3 class="text-lg font-semibold">Army Units:</h3>
      <ul>
        <li v-for="(unit, index) in army" :key="index" class="mb-4">
          <div class="flex items-center">
            <span>{{ unit.unitName }} ({{ unitPoints(unit) }} points)</span>
            <div class="flex ml-auto">
              <v-btn icon small @click="removeUnitFromArmy(index)">
                <v-icon small>mdi-delete</v-icon>
              </v-btn>
              <UnitInfoDialog :url="constructUnitUrl(url, unit.unitName)" />
            </div>
          </div>
          <template v-if="!unit.isEpicHero">
            <Enhancements 
              :enhancementUrl="generateEnhancementUrl(selectedFaction, selectedArmy, selectedDetachment)"
              :initialSelectedEnhancement="unit.selectedEnhancement"
              @update-enhancement="updateEnhancement(index, $event)"
            />
          </template>
          <div v-if="unit.isEpicHero" class="text-red-500">Epic Hero</div>
          <div v-if="unit.selectedEnhancement">
            <strong>Enhancement:</strong> {{ unit.selectedEnhancement.name }} ({{ unit.selectedEnhancement.points }} points)
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
import UnitInfoDialog from './UnitInfoDialog.vue'; // Import the component
import Enhancements from './Enhancements.vue';

const props = defineProps({
  url: {
    type: String,
    required: true
  },
  armyIndex: {
    type: Number,
    required: true
  },
  selectedDetachment: {
    type: String,
    required: true
  },
  selectedFaction: {
    type: String,
    required: true
  },
  selectedArmy: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['update-total-points']);

const units = ref([]);
const army = ref([]);
const armyStore = useArmyStorage();
const totalPoints = ref(0);

const unitCounts = computed(() => {
  const counts = {};
  army.value.forEach(unit => {
    counts[unit.unitName] = (counts[unit.unitName] || 0) + 1;
  });
  return counts;
});

const unitPoints = (unit) => {
  return unit.basicPoints + (unit.selectedEnhancement ? unit.selectedEnhancement.points : 0);
};

const calculateTotalPoints = () => {
  totalPoints.value = army.value.reduce((sum, unit) => sum + unitPoints(unit), 0);
  emit('update-total-points', totalPoints.value);
};

const addUnitToArmy = (unit) => {
  if (!army.value.some(existingUnit => existingUnit.id === unit.id)) {
    army.value.push(unit);
    armyStore.addCharacterUnitToArmy(props.armyIndex, unit);
    fetchUnitDetails(unit, army.value.length - 1);
  } else {
    console.warn(`Unit with id ${unit.id} is already in the army`);
  }
  calculateTotalPoints();
};

const removeUnitFromArmy = (index) => {
  armyStore.removeCharacterUnitFromArmy(props.armyIndex, index);
  army.value.splice(index, 1);
  calculateTotalPoints();
};

const loadUnits = () => {
  fetch(props.url)
    .then(response => response.json())
    .then(data => {
      units.value = data.characters;
    });

  const loadedArmy = armyStore.loadCharacterUnitsForArmy(props.armyIndex);
  army.value = loadedArmy;

  loadedArmy.forEach((unit, index) => {
    fetchUnitDetails(unit, index);
  });

  calculateTotalPoints();
};

const fetchUnitDetails = async (unit, index) => {
  const unitUrl = `${props.url.replace('collection.json', `collection/${unit.unitName}.json`)}`;
  const response = await fetch(unitUrl);
  const data = await response.json();
  const isEpicHero = data.keywords?.includes('epic hero') || false;
  updateUnit(index, { ...unit, isEpicHero });
};

const updateUnit = (index, updatedUnit) => {
  army.value = army.value.map((unit, i) => i === index ? updatedUnit : unit);
  calculateTotalPoints();
};

const generateEnhancementUrl = (faction, army, detachment) => {
  const formatString = (value) => value.toLowerCase().replace(/[^a-z0-9]/g, '-');
  const formattedFaction = formatString(faction);
  const formattedArmy = formatString(army);
  const formattedDetachment = formatString(detachment);
  return `faction/${formattedFaction}/${formattedArmy}/detachment/${formattedDetachment}.json`;
};

const updateEnhancement = (index, enhancement) => {
  const updatedUnit = { ...army.value[index], selectedEnhancement: enhancement || null };
  updateUnit(index, updatedUnit);
  armyStore.updateCharacterUnitEnhancement(props.armyIndex, index, enhancement || null);
  calculateTotalPoints();
};

const constructUnitUrl = (baseUrl, unitName) => {
  const sanitizedUnitName = unitName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  const baseUrlParts = baseUrl.split('/');
  baseUrlParts.pop();
  return `${baseUrlParts.join('/')}/collection/${sanitizedUnitName}.json`;
};

onMounted(() => {
  loadUnits();
});

watch(() => props.armyIndex, loadUnits);
</script>

<style scoped>
.mb-4 {
  margin-bottom: 1rem;
}
</style>
