<template>
  <div>
    <v-dialog max-width="500">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn v-bind="activatorProps" color="surface-variant" text="Wargear" variant="flat"></v-btn>
      </template>
      <template v-slot:default="{ isActive }">
        <v-card title="Wargear Options">
          <div v-if="unitComposition">
            <div v-for="(unit, unitIndex) in unitComposition" :key="unitIndex">
              <p>{{ unit.unitType }}</p>
              <p>this unit is equipped with</p>
              <ul>
                <li v-for="(equipment, equipmentIndex) in unit.equipment" :key="equipmentIndex">
                  {{ equipment }}
                </li>
              </ul>
            </div>
          </div>
          <div v-if="wargearData">
            <div v-for="(gear, index) in wargearData" :key="index">
              <p>{{ gear.description }}</p>
              <ul>
                <li v-for="(item, itemIndex) in gear.items" :key="itemIndex">
                  {{ item }}
                  <div class="small-icon" @click="decreaseItem(item)">
                    <v-icon>mdi-minus</v-icon>
                  </div>
                  <div class="small-icon" @click="increaseItem(item)">
                    <v-icon>mdi-plus</v-icon>
                  </div>
                  <span v-if="getItemAmount(item)">{{ getItemAmount(item) }}</span>
                </li>
              </ul>
            </div>
          </div>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text="Close" @click="closeDialog(isActive)"></v-btn>
          </v-card-actions>
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
  unitId: Number,
});

const emit = defineEmits(["updateWargear"]);

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
  transformedParentUnit.value = props.parentUnit.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-_]/g, "_");
};

// Run the transformation on mounted
onMounted(() => {
  transformParentUnit();

  constructedURL.value = `faction/${props.url}/collection/${transformedParentUnit.value}.json`;

  fetch(constructedURL.value)
    .then((response) => response.json())
    .then((data) => {
      if (data && data.wargear && data.wargear.length > 0) {
        wargearData.value = data.wargear;
      }
      if (data && data.unitComposition && data.unitComposition.length > 0) {
        unitComposition.value = data.unitComposition;
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
});

// Watch for changes in selectedItems and emit the updated data
watch(
  selectedItems,
  (newVal) => {
    emit("updateWargear", { wargear: newVal, unitId: props.unitId });
  },
  { deep: true }
);

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

// Method to close the dialog and emit the wargear data
const closeDialog = (isActive) => {
  isActive.value = false;
  emit("updateWargear", { wargear: selectedItems.value, unitId: props.unitId });
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

.small-icon {
  font-size: 16px;
  cursor: pointer;
  display: inline-block;
  padding: 4px;
}
</style>
