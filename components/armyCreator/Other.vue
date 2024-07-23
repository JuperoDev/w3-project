<template>
  <div class="bg-gray-800 p-4 rounded-lg shadow-md text-white">
    <div class="flex justify-between items-center">
      <h2 class="text-lg font-semibold">Other</h2>
      <span>Total Points: {{ totalPoints }}</span>
    </div>
    <UnitDialog 
      :title="'Select Other Units'" 
      :units="units" 
      :unitCounts="unitCounts"
      @add-unit="addUnitToArmy" 
    />
    <div v-if="army.length" class="mt-4">
      <h3 class="text-lg font-semibold">Army Units:</h3>
      <ul>
        <li v-for="unit in army" :key="unit.id" class="flex flex-col mb-4">
          <div>
            <span>
              {{ unit.unitName }} 
              ({{ unit.basicPoints }} points)
              <span v-if="unit.composition">
                - {{ getCompositionString(unit.composition) }}
              </span>
            </span>
          </div>
          <div class="flex items-center mt-2 space-x-2">
            <span 
              class="text-sm text-blue-500 cursor-pointer hover:underline" 
              @click="removeUnitFromArmy(unit.id)"
            >
              Delete
            </span>
            <UnitInfoDialog :url="constructUnitUrl(url, unit.unitName)" />
            <UnitOptionsDialog 
              :unitName="unit.unitName"
              :url="constructUnitUrl(url, unit.unitName)"
              :currentOption="{ points: unit.basicPoints, composition: unit.composition }"
              @update-unit-option="updateUnitOption(unit.id, $event)"
            />
            <WargearOptionsButton 
              :url="constructUnitUrl(url, unit.unitName)" 
              :armyIndex="armyIndex"
              :initialWargear="unit.equipmentQuantities"
              :unitName="unit.unitName"
              @update-wargear-quantities="updateWargearQuantities(unit.id, $event)"
            />
          </div>
          <div class="mt-2 ml-4">
            <EquipmentList 
              :equipment="unit.equipment" 
              :equipmentQuantities="unit.equipmentQuantities || {}"
              :unitName="unit.unitName"
              :unitTypes="unit.unitTypes"
               :unitComposition="unit.composition"
            />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import { useArmyStorage } from '@/stores/armyStorage';
import UnitDialog from './UnitDialog.vue';
import UnitInfoDialog from './UnitInfoDialog.vue';
import UnitOptionsDialog from './UnitOptionsDialog.vue';
import WargearOptionsButton from './WargearOptionsButton.vue';
import EquipmentList from './EquipmentList.vue';

const props = defineProps({
  url: { type: String, required: true },
  armyIndex: { type: Number, required: true }
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

const syncArmyWithStore = () => {
  army.value = armyStore.loadOtherUnitsForArmy(props.armyIndex);
  calculateTotalPoints();
  checkWargearOptionsForUnits();
};

const calculateTotalPoints = () => {
  totalPoints.value = army.value.reduce((sum, unit) => sum + unit.basicPoints, 0);
  emit('update-total-points', totalPoints.value);
};

const addUnitToArmy = async (unit) => {
  try {
    const uniqueId = Date.now().toString(36) + Math.random().toString(36).substr(2);
    const response = await fetch(constructUnitUrl(props.url, unit.unitName));
    const unitData = await response.json();

    const selectedOption = unitData.options[0];
    const unitWithId = { 
      ...unit, 
      id: uniqueId, 
      url: unit.url || props.url,
      composition: selectedOption.count.map((count, index) => ({
        unitType: unitData.unitComposition[index].unitType,
        quantity: count
      })),
      basicPoints: selectedOption.points,
      equipment: unitData.unitComposition[0].equipment,
      minQuantity: unitData.unitComposition[0].minQuantity,
      hasWargear: unitData.wargear && unitData.wargear.length > 0,
      equipmentQuantities: unitData.unitComposition.reduce((acc, composition) => {
        composition.equipment.forEach(equip => {
          acc[`${composition.unitType}_${equip}`] = composition.minQuantity;
        });
        return acc;
      }, {}),
      unitTypes: unitData.unitComposition.map(comp => comp.unitType)
    };

    armyStore.addOtherUnitToArmy(props.armyIndex, unitWithId);
    syncArmyWithStore();
  } catch (error) {
    console.error('Error adding unit to army:', error);
  }
};

const removeUnitFromArmy = (id) => {
  armyStore.removeOtherUnitFromArmy(props.armyIndex, id);
  syncArmyWithStore();
};

const updateUnitOption = (unitId, optionData) => {
  const unitIndex = army.value.findIndex(unit => unit.id === unitId);
  if (unitIndex !== -1) {
    const updatedUnit = {
      ...army.value[unitIndex],
      composition: optionData.composition,
      basicPoints: optionData.points
    };
    
    armyStore.updateOtherUnitInArmy(props.armyIndex, unitId, updatedUnit);
    syncArmyWithStore();
  }
};

const loadUnits = () => {
  fetch(props.url)
    .then(response => response.json())
    .then(data => {
      units.value = data.other;
    })
    .catch(error => {
      console.error('Error loading units:', error);
    });
  syncArmyWithStore();
};

const constructUnitUrl = (baseUrl, unitName) => {
  const sanitizedUnitName = unitName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  const baseUrlParts = baseUrl.split('/');
  baseUrlParts.pop(); 
  return `${baseUrlParts.join('/')}/collection/${sanitizedUnitName}.json`;
};

const checkWargearOptionsForUnits = async () => {
  for (const unit of army.value) {
    const url = constructUnitUrl(props.url, unit.unitName);
    try {
      const response = await fetch(url);
      const data = await response.json();
      unit.hasWargear = data.wargear && data.wargear.length > 0;
    } catch (error) {
      console.error('Error checking wargear options:', error);
      unit.hasWargear = false;
    }
  }
};

const getCompositionString = (composition) => {
  if (!composition) return '';
  return composition.map(unit => `${unit.quantity} ${unit.unitType}`).join(', ');
};

const updateWargearQuantities = (unitId, quantities) => {
  const unitIndex = army.value.findIndex(unit => unit.id === unitId);
  if (unitIndex !== -1) {
    const updatedUnit = {
      ...army.value[unitIndex],
      equipmentQuantities: quantities
    };
    army.value[unitIndex] = updatedUnit;
    armyStore.updateOtherUnitInArmy(props.armyIndex, unitId, updatedUnit);
    syncArmyWithStore();
  }
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
