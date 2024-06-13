<template>
  <div>
    <!-- Dialog for displaying wargear -->
    <v-dialog max-width="500">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          v-bind="activatorProps"
          color="surface-variant"
          text="Wargear"
          variant="flat"
        ></v-btn>
      </template>

      <template v-slot:default="{ isActive }">
        <v-card title="Wargear Options">
          <!-- basic wargear -->
          <!-- Conditional rendering based on unitComposition -->
          <div v-if="unitComposition">
            <div v-for="(unit, unitIndex) in unitComposition" :key="unitIndex">
              <p>{{ unit.unitType }}</p>
              <p>this unit is equipped with</p>
              <ul>
                <!-- Loop through unit equipment -->
                <li v-for="(equipment, equipmentIndex) in unit.equipment" :key="equipmentIndex">{{ equipment }}</li>
              </ul>
            </div>
          </div>

          <!-- plus wargear -->
          <!-- Conditional rendering based on wargearData -->
          <div v-if="wargearData">
            <div v-for="(gear, index) in wargearData" :key="index">
              <p>{{ gear.description }}</p>
              <ul>
                <!-- Loop through gear.items -->
                <li v-for="(item, itemIndex) in gear.items" :key="itemIndex">
                  {{ item }}
                  <v-btn icon small @click="increaseItem(item)">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                  <v-btn icon small @click="decreaseItem(item)">
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                  <span v-if="getItemAmount(item)">{{ getItemAmount(item) }}</span>
                </li>
              </ul>
            </div>
          </div>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text="Close" @click="isActive.value = false"></v-btn>
          </v-card-actions>

          <!-- Styled selected items list -->
          <div class="selected-items">
            <p>Selected Items:</p>
            <ul>
              <li v-for="item in selectedItems" :key="item.item">
                {{ item.item }} x{{ item.amount }}
              </li>
            </ul>
          </div>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";

// Define props
const props = defineProps({
  url: String,
  unit: Object,
  parentUnit: String,
});

const emit = defineEmits(['updateWargear']);

// Define a ref for storing the transformed parentUnit
const transformedParentUnit = ref("");

// Define a ref to store the constructed URL
const constructedURL = ref("");

// Define a ref to store the wargear data
const wargearData = ref([]);

// Define a ref to store the unitComposition data
const unitComposition = ref([]);

// Define a ref to store the selected items and their counts
const selectedItems = ref([]);

// Function to transform the parentUnit
const transformParentUnit = () => {
  // Replace spaces with hyphens and weird characters with underscores
  transformedParentUnit.value = props.parentUnit
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9-_]/g, "_");
};

// Run the transformation on mounted
onMounted(() => {
  transformParentUnit();

  // Compute the constructed URL
  constructedURL.value = `faction/${props.url}/collection/${transformedParentUnit.value}.json`;

  // Fetch the data from the constructed URL
  fetch(constructedURL.value)
    .then((response) => response.json())
    .then((data) => {
      // Check if wargear is available in the JSON data
      if (data && data.wargear && data.wargear.length > 0) {
        // If wargear exists, assign it to wargearData
        wargearData.value = data.wargear;
      }

      // Check if unitComposition is available in the JSON data
      if (data && data.unitComposition && data.unitComposition.length > 0) {
        // If unitComposition exists, assign it to unitComposition
        unitComposition.value = data.unitComposition;
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
});

// Watch for changes in selectedItems and emit the updated data
watch(selectedItems, (newVal) => {
  emit('updateWargear', newVal);
  console.log(selectedItems);
}, { deep: true });

// Method to increase item count
const increaseItem = (item) => {
  const existingItem = selectedItems.value.find((i) => i.item === item);
  if (existingItem) {
    existingItem.amount++;
  } else {
    selectedItems.value.push({ item, amount: 1 });
  }
};

// Method to decrease item count
const decreaseItem = (item) => {
  const existingItem = selectedItems.value.find((i) => i.item === item);
  if (existingItem && existingItem.amount > 0) {
    existingItem.amount--;
    if (existingItem.amount === 0) {
      selectedItems.value = selectedItems.value.filter((i) => i.item !== item);
    }
  }
};

// Method to get item amount
const getItemAmount = (item) => {
  const existingItem = selectedItems.value.find((i) => i.item === item);
  return existingItem ? existingItem.amount : 0;
};
</script>

<style scoped>
.selected-items {
  margin-top: 16px;
}

.selected-items ul {
  list-style-type: none;
  padding: 0;
}

.selected-items li {
  margin: 8px 0;
  font-weight: bold;
}
</style>
