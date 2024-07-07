<template>
  <div class="bg-gray-800 p-4 rounded-lg shadow-md text-white">
    <div class="flex justify-between items-center">
      <h2 class="text-lg font-semibold">Characters</h2>
    </div>
    <p><strong>URL:</strong> {{ url }}</p>
    <p><strong>Detachment:</strong> {{ selectedDetachment }}</p> <!-- Added line -->

    <UnitDialog :title="'Select Characters'" :units="units" @add-unit="addUnitToArmy" />
    <div v-if="army.length" class="mt-4">
      <h3 class="text-lg font-semibold">Army Units:</h3>
      <ul>
        <li v-for="(unit, index) in army" :key="index" class="mb-4">
          <div>
            {{ unit.unitName }} ({{ unit.basicPoints }} points)
            <v-btn icon small @click="removeUnitFromArmy(index)">
              <v-icon small>mdi-delete</v-icon>
            </v-btn>
          </div>
          <template v-if="!unit.isEpicHero">
            <Enhancements />
          </template>
          <div v-if="unit.isEpicHero" class="text-red-500">Epic Hero</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useArmyStorage } from '@/stores/armyStorage';
import UnitDialog from './UnitDialog.vue';
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
  }
});

const units = ref([]);
const army = ref([]);
const armyStore = useArmyStorage();

const addUnitToArmy = (unit) => {
  if (!army.value.some(existingUnit => existingUnit.id === unit.id)) {
    army.value.push(unit);
    armyStore.addCharacterUnitToArmy(props.armyIndex, unit);
    console.log('Updated army:', army.value);
    fetchUnitDetails(unit, army.value.length - 1);
  } else {
    console.warn(`Unit with id ${unit.id} is already in the army`);
  }
};

const removeUnitFromArmy = (index) => {
  armyStore.removeCharacterUnitFromArmy(props.armyIndex, index);
  army.value.splice(index, 1);
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
