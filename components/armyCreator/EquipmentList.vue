<template>
  <div>
    <h4 class="text-md font-semibold">Equipment:</h4>
    <div v-for="(items, miniature) in groupedEquipment" :key="miniature">
      <h5>{{ miniature }}</h5>
      <ul>
        <li v-for="(quantity, item) in items" :key="item" class="ml-2">
          {{ item }} x{{ quantity }}
        </li>
      </ul>
    </div>
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
  },
  unitName: {
    type: String,
    required: true
  }
});

// Compute grouped equipment quantities, excluding those with zero quantities
const groupedEquipment = computed(() => {
  const list = { ...props.equipmentQuantities };
  const grouped = {
    [props.unitName]: {}
  };

  props.equipment.forEach(item => {
    if (list[item] === undefined) {
      list[item] = 0;
    }
  });

  Object.entries(list).forEach(([item, quantity]) => {
    if (quantity > 0) {
      if (!grouped[props.unitName]) {
        grouped[props.unitName] = {};
      }
      grouped[props.unitName][item] = quantity;
    }
  });

  return grouped;
});
</script>

<style scoped>
.ml-2 {
  margin-left: 0.5rem;
}
</style>
