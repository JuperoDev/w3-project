<template>
    <div class="bg-gray-50 m-2 p-2 rounded-lg shadow-md text-zinc-900">
      <div class="armyType__container sticky-container p-2 bg-zinc-700 text-white flex justify-between items-center">
        <div class="armytype-button__container">
          <div class="flex items-center">
            <h2 class="text-lg font-semibold mr-5">Allied Units</h2>
            <!-- This button opens the AlliedUnitDialog -->
            <AlliedUnitDialog
              title="Add Allied Unit"
              :units="availableUnits"
            />
          </div>
          <span><small>Total Points: {{ totalPoints }}</small></span>
        </div>
      </div>
  
      <div v-if="army.length" class="mt-4">
        <ul>
          <li v-for="armyGroup in army" :key="armyGroup.armyName" class="mb-4">
            <h4 class="text-md font-semibold mt-2">{{ armyGroup.armyName }}</h4>
            <ul>
              <li
                v-for="unit in armyGroup.units"
                :key="unit.id"
                class="border-solid border-b-2 rounded-t-lg border-zinc-500 bg-zinc-100 p-2 flex flex-col mb-4"
              >
                <div>
                  <p>
                    <span class="font-semibold">{{ unit.unitName }}</span>
                    <span> ({{ unit.basicPoints }} points)</span>
                  </p>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from "vue";
  import AlliedUnitDialog from './AlliedUnitDialog.vue';  // Import the AlliedUnitDialog component
  import { useArmyStorage } from "@/stores/armyStorage";
  
  const props = defineProps({
    url: { type: String, required: true },
  });
  
  const army = ref([]);
  const totalPoints = ref(0);
  const availableUnits = ref([]);  // This will be passed to AlliedUnitDialog
  const armyStore = useArmyStorage();
  
  const loadAlliedUnits = () => {
    fetch(props.url)
      .then((response) => response.json())
      .then((data) => {
        availableUnits.value = data.alliedUnits.flatMap((armyGroup) =>
          armyGroup.alliedUnits.map((unit) => ({
            ...unit,
            alliedArmyName: armyGroup.alliedArmy,
          }))
        );
        syncArmyWithStore();
      })
      .catch((error) => console.error("Error loading units:", error));
  };
  
  const syncArmyWithStore = () => {
    const storedUnits = armyStore.loadAlliedUnitsForArmy();
    army.value = storedUnits.reduce((grouped, unit) => {
      const group = grouped.find(
        (g) => g.armyName === unit.alliedArmyName
      );
      if (group) {
        group.units.push(unit);
      } else {
        grouped.push({ armyName: unit.alliedArmyName, units: [unit] });
      }
      return grouped;
    }, []);
    calculateTotalPoints();
  };
  
  const calculateTotalPoints = () => {
    totalPoints.value = army.value
      .flatMap((group) => group.units)
      .reduce((sum, unit) => sum + unit.basicPoints, 0);
  };
  
  onMounted(() => {
    loadAlliedUnits();
  });
  </script>
  
  <style scoped>
  .armyType__container {
    padding: 15px 15px 15px 15px;
  }
  
  .sticky-container {
    position: -webkit-sticky;
    position: sticky;
    top: 50px;
    z-index: 10;
  }
  
  .text-md {
    font-size: 1.125rem;
  }
  
  .mb-4 {
    margin-bottom: 1rem;
  }
  </style>
  