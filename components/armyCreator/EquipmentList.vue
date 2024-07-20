<template>
    <div>
      <h4 class="text-md font-semibold">Equipment:</h4>
      <ul>
        <li v-for="item in equipmentList" :key="item" class="ml-2">
          {{ item }}
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
    }
  });
  
  const equipmentList = computed(() => {
    return props.equipment.map(item => `${item} x${props.minQuantity}`);
  });
  </script>
  