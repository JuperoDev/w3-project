<template>
  <div class="bg-gray-50 m-2 p-2 rounded-lg shadow-md text-zinc-900">
    <div class="armyType__container sticky-container p-2 bg-zinc-700 text-white flex justify-between items-center">
      <div class="armytype-button__container">
        <div class="flex items-center">
          <h2 class="text-lg font-semibold mr-5">Allied Units</h2>

          <AlliedUnitDialog
            :title="'Allied Unit'"
            :selectedDetachment="selectedDetachment"
            :units="units || []"
            :unitCounts="unitCounts"
            @add-unit="addUnitToArmy"
          />
        </div>
        <span><small>Total Points: {{ totalPoints }}</small></span>
      </div>
    </div>

    <div v-if="army.length" class="mt-4">
      <ul>

        <li
          v-for="unit in army"
          :key="unit.id"
          class="border-solid border-b-2 rounded-t-lg border-zinc-500 bg-zinc-100 p-2 flex flex-col mb-4"
        >
          <div>
            <span>
              <p>
                <span class="font-semibold">{{ unit.unitName }}</span>
                <span> ({{ unit.basicPoints }} points)</span>
              </p>
              <p v-if="unit.composition">
                {{ getCompositionString(unit.composition) }}
              </p>
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
            <!-- Duplicate Unit Button -->
            <span
              class="text-sm text-blue-500 cursor-pointer hover:underline"
              @click="duplicateUnit(unit)"
            >
              Duplicate
            </span>
          </div>
          <div class="mt-2 ml-4 mb-1">
            <EquipmentList
              :equipment="unit.equipment"
              :equipmentQuantities="unit.equipmentQuantities || {}"
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

import { ref, onMounted, watch, computed } from "vue";
import { useArmyStorage } from "@/stores/armyStorage";
import AlliedUnitDialog from "./AlliedUnitDialog.vue";
import UnitInfoDialog from "./UnitInfoDialog.vue";
import UnitOptionsDialog from "./UnitOptionsDialog.vue";
import WargearOptionsButton from "./WargearOptionsButton.vue";
import EquipmentList from "./EquipmentList.vue";

const props = defineProps({
  url: { type: String, required: true },
  armyIndex: { type: Number, required: true },
  selectedDetachment: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update-total-points"]);

const units = ref([]); // Ensure this is defined and defaulted to an empty array.
const army = ref([]);
const armyStore = useArmyStorage();
const totalPoints = ref(0);

const unitCounts = computed(() => {
  const counts = {};
  army.value.forEach((unit) => {
    counts[unit.unitName] = (counts[unit.unitName] || 0) + 1;
  });
  return counts;
});

const sortArmyByUnitName = () => {
  army.value.sort((a, b) => a.unitName.localeCompare(b.unitName));
};

const syncArmyWithStore = () => {
  army.value = armyStore.loadAlliedUnitsForArmy(props.armyIndex);
  sortArmyByUnitName();
  calculateTotalPoints();
  checkWargearOptionsForUnits();
};

const calculateTotalPoints = () => {
  totalPoints.value = army.value.reduce(
    (sum, unit) => sum + unit.basicPoints,
    0
  );
  emit("update-total-points", totalPoints.value);
};

const addUnitToArmy = async (unit) => {
  try {
    const uniqueId =
      Date.now().toString(36) + Math.random().toString(36).substr(2);
    const response = await fetch(constructUnitUrl(props.url, unit.unitName));

    if (!response.ok) {
      console.error(`Failed to fetch data for unit ${unit.unitName}`);
      return;
    }

    const unitData = await response.json();

    if (!unitData || !unitData.options || !unitData.options[0]) {
      console.error("Invalid unit data:", unitData);
      return;
    }

    const selectedOption = unitData.options[0];
    const unitWithId = {
      ...unit,
      id: uniqueId,
      url: constructUnitUrl(props.url, unit.unitName),
      composition: selectedOption.count.map((count, index) => ({
        unitType: unitData.unitComposition[index].unitType,
        quantity: count,
      })),
      unitTypes: unitData.unitComposition.map((comp) => comp.unitType),
      basicPoints: selectedOption.points,
      equipment: unitData.unitComposition.flatMap((comp) => comp.equipment),
      hasWargear: unitData.wargear && unitData.wargear.length > 0,
      equipmentQuantities: unitData.unitComposition.reduce(
        (acc, composition) => {
          composition.equipment.forEach((equip) => {
            acc[`${composition.unitType}_${equip}`] = composition.minQuantity;
          });
          return acc;
        },
        {}
      ),
    };

    armyStore.addAlliedUnitToArmy(props.armyIndex, unitWithId);
    syncArmyWithStore();
  } catch (error) {
    console.error("Error adding unit to army:", error);
  }
};

const removeUnitFromArmy = (id) => {
  armyStore.removeAlliedUnitFromArmy(props.armyIndex, id);
  syncArmyWithStore();
};

const updateUnitOption = (unitId, optionData) => {
  const unitIndex = army.value.findIndex((unit) => unit.id === unitId);
  if (unitIndex !== -1) {
    const updatedUnit = {
      ...army.value[unitIndex],
      composition: optionData.composition,
      basicPoints: optionData.points,
    };

    armyStore.updateAlliedUnitInArmy(props.armyIndex, unitId, updatedUnit);
    syncArmyWithStore();
  }
};

// Duplicate the unit with a new ID
const duplicateUnit = (unit) => {
  const uniqueId = Date.now().toString(36) + Math.random().toString(36).substr(2);

  // Create a deep clone of the unit and assign a new ID
  const duplicatedUnit = {
    ...unit,
    id: uniqueId,
    equipmentQuantities: { ...unit.equipmentQuantities },
    composition: unit.composition.map((comp) => ({ ...comp })),
  };

  // Push the duplicated unit into the store
  armyStore.addAlliedUnitToArmy(props.armyIndex, duplicatedUnit);

  // Sync the UI with the updated store
  syncArmyWithStore();
};

const loadUnits = () => {
  fetch(props.url)
    .then((response) => response.json())
    .then((data) => {
      units.value = data.allied || []; // Ensure we assign an array even if data.allied is undefined.
    })
    .catch((error) => {
      console.error("Error loading units:", error);
      units.value = []; // Fallback to an empty array on error.
    });
  syncArmyWithStore();
};

const constructUnitUrl = (baseUrl, unitName) => {
  const sanitizedUnitName = unitName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const baseUrlParts = baseUrl.split("/");
  baseUrlParts.pop();
  return `${baseUrlParts.join("/")}/collection/allies/${sanitizedUnitName}.json`; // Always point to the allies folder
};

const checkWargearOptionsForUnits = async () => {
  for (const unit of army.value) {
    const url = constructUnitUrl(props.url, unit.unitName);
    try {
      const response = await fetch(url);
      const data = await response.json();
      unit.hasWargear = data.wargear && data.wargear.length > 0;
    } catch (error) {
      console.error("Error checking wargear options:", error);
      unit.hasWargear = false;
    }
  }
};

const getCompositionString = (composition) => {
  if (!composition) return "";
  return composition
    .map((unit) => `${unit.quantity} ${unit.unitType}`)
    .join(", ");
};

const updateWargearQuantities = (unitId, quantities) => {
  const unitIndex = army.value.findIndex((unit) => unit.id === unitId);
  if (unitIndex !== -1) {
    const updatedUnit = {
      ...army.value[unitIndex],
      equipmentQuantities: quantities,
    };
    army.value[unitIndex] = updatedUnit;
    armyStore.updateAlliedUnitInArmy(props.armyIndex, unitId, updatedUnit);
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

.sticky-container {
  position: -webkit-sticky;
  position: sticky;
  top: 50px;
  z-index: 10;
}
</style>
