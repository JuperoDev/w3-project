<template>
  <div>
    <v-dialog max-width="500">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn v-bind="activatorProps" color="surface-variant" text="Wargear" variant="flat">Wargear</v-btn>
      </template>
      <template v-slot:default="{ isActive }">
        <v-card title="Wargear Options">
          <div v-if="wargearData">
            <div v-for="(gear, index) in wargearData" :key="index">
              <p>{{ gear.miniature }}: {{ gear.description }}</p>
              <ul>
                <li v-for="(item, itemIndex) in gear.items" :key="itemIndex">
                  {{ item }}
                  <div class="small-icon" @click="decreaseItem(item, gear.miniature)">
                    <v-icon>mdi-minus</v-icon>
                  </div>
                  <div class="small-icon" @click="increaseItem(item, gear.miniature)">
                    <v-icon>mdi-plus</v-icon>
                  </div>
                  <span v-if="getItemAmount(item, gear.miniature)">{{ getItemAmount(item, gear.miniature) }}</span>
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
  parentUnit: String,
  unitId: Number,
});

const emit = defineEmits(["updateWargear"]);

// Define refs for data
const transformedParentUnit = ref("");
const constructedURL = ref("");
const wargearData = ref([]);
const selectedItems = ref([]);

// Transform the parentUnit name to construct the URL
const transformParentUnit = () => {
  transformedParentUnit.value = props.parentUnit.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-_]/g, "_");
};

// Fetch data on mount
onMounted(() => {
  transformParentUnit();
  constructedURL.value = `faction/${props.url}/collection/${transformedParentUnit.value}.json`;

  fetch(constructedURL.value)
    .then(response => response.json())
    .then(data => {
      if (data && data.wargear && data.wargear.length > 0) {
        wargearData.value = data.wargear;
      }
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
});

// Watch for changes in selectedItems and emit the updated data
watch(
  selectedItems,
  newVal => {
    emit("updateWargear", { wargear: newVal, unitId: props.unitId });
  },
  { deep: true }
);

// Methods to manage item counts
const increaseItem = (item, miniature) => {
  const existingItem = selectedItems.value.find(i => i.item === item && i.miniature === miniature);
  if (existingItem) {
    existingItem.amount++;
  } else {
    selectedItems.value.push({ item, amount: 1, miniature });
  }
};

const decreaseItem = (item, miniature) => {
  const existingItem = selectedItems.value.find(i => i.item === item && i.miniature === miniature);
  if (existingItem && existingItem.amount > 0) {
    existingItem.amount--;
    if (existingItem.amount === 0) {
      selectedItems.value = selectedItems.value.filter(i => i.item !== item || i.miniature !== miniature);
    }
  }
};

const getItemAmount = (item, miniature) => {
  const existingItem = selectedItems.value.find(i => i.item === item && i.miniature === miniature);
  return existingItem ? existingItem.amount : 0;
};

// Method to close the dialog and emit the wargear data
const closeDialog = isActive => {
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
