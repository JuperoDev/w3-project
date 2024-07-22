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
  const list = { ...props.generalEquipment };
  
  // Update quantities based on equipmentQuantities
  Object.keys(props.equipmentQuantities).forEach(item => {
    list[item] = props.equipmentQuantities[item];
  });

  // Ensure all equipment from the equipment prop is included
  props.equipment.forEach(item => {
    if (list[item] === undefined) {
      list[item] = props.minQuantity;
    }
  });

  // Filter out items with a quantity of 0
  return Object.fromEntries(
    Object.entries(list).filter(([_, quantity]) => quantity > 0)
  );
});
</script>

<style scoped>
.ml-2 {
  margin-left: 0.5rem;
}
</style>