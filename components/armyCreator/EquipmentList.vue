<template>
  <div>
    <h4 class="text-md font-semibold">Equipment:</h4>
    <ul>
      <li v-for="(quantity, item) in equipmentList" :key="item" class="ml-2">
        {{ item }} x{{ quantity }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  equipment: {
    type: Array,
    required: true
  },
  minQuantity: {
    type: Number,
    required: true
  },
  equipmentQuantities: {
    type: Object,
    default: () => ({})
  },
  generalEquipment: {
    type: Object,
    default: () => ({})
  }
});

const equipmentList = computed(() => {
  const list = {};
  // Include all items from generalEquipment, overriding with equipmentQuantities if present
  Object.keys(props.generalEquipment).forEach(item => {
    list[item] = props.generalEquipment[item];
  });

  // Ensure default equipment items are added with the minimum quantity
  props.equipment.forEach(item => {
    if (list[item] === undefined) {
      list[item] = props.minQuantity;
    }
  });

  // Override with specific equipment quantities
  Object.keys(props.equipmentQuantities).forEach(item => {
    list[item] = props.equipmentQuantities[item];
  });

  // Filter out items with a quantity of 0
  const filteredList = {};
  Object.keys(list).forEach(item => {
    if (list[item] > 0) {
      filteredList[item] = list[item];
    }
  });

  return filteredList;
});
</script>

<style scoped>
.ml-2 {
  margin-left: 0.5rem;
}
</style>
