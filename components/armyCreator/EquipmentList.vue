<template>
  <div>
    <div v-for="(details, unitType) in formattedEquipment" :key="unitType">
      <h5>{{ details.count }}x {{ unitType }}</h5>
      <ul>
        <li v-for="(quantity, item) in details.equipment" :key="item" class="ml-2">
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
  unitTypes: {
    type: Array,
    required: true
  },
  unitComposition: {
    type: Array,
    required: true
  }
});

// Compute formatted equipment quantities, excluding those with zero quantities
const formattedEquipment = computed(() => {
  const list = {};
  const grouped = {};

  // Initialize equipment quantities to be case insensitive
  Object.entries(props.equipmentQuantities).forEach(([key, value]) => {
    list[key.toLowerCase()] = value;
  });

  // Initialize unit types and their counts
  props.unitComposition.forEach(unit => {
    const lowerUnitType = unit.unitType.toLowerCase();
    grouped[lowerUnitType] = {
      count: unit.quantity,
      equipment: {}
    };
  });

  // Populate the equipment list
  props.equipment.forEach(item => {
    const lowerItem = item.toLowerCase();
    if (list[lowerItem] === undefined) {
      list[lowerItem] = 0;
    }
  });

  // Assign equipment quantities to the corresponding unit types
  Object.entries(list).forEach(([item, quantity]) => {
    if (quantity > 0) {
      const [unitType, equipment] = item.split('_');
      if (grouped[unitType]) {
        grouped[unitType].equipment[equipment] = quantity;
      }
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
