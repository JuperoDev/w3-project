<template>
  <div>
    <h4 class="text-md font-semibold">Equipment:</h4>
    <ul>
      <li v-for="(quantity, item) in filteredEquipment" :key="item" class="ml-2">
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
  equipmentQuantities: {
    type: Object,
    default: () => ({})
  }
});

// Compute filtered equipment quantities, excluding those with zero quantities
const filteredEquipment = computed(() => {
  const list = { ...props.equipmentQuantities };

  props.equipment.forEach(item => {
    if (list[item] === undefined) {
      list[item] = 0;
    }
  });

  // Only include items with quantities greater than zero
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
