<template>
    <div v-if="isEpicHero" class="text-red-500">
      Epic Hero
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  
  const props = defineProps({
    unit: {
      type: Object,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  });
  
  const isEpicHero = ref(false);
  
  const fetchUnitDetails = async () => {
    const unitUrl = `${props.url.replace('collection.json', `collection/${props.unit.unitName}.json`)}`;
    const response = await fetch(unitUrl);
    const data = await response.json();
    isEpicHero.value = data.keywords?.includes('epic hero') || false;
  };
  
  onMounted(fetchUnitDetails);
  watch(() => props.unit, fetchUnitDetails);
  </script>
  
  <style scoped>
  .text-red-500 {
    color: #f56565;
  }
  </style>
  