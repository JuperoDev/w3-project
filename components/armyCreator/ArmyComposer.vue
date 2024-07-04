<template>
    <div>
      <p><strong>Name:</strong> {{ name }}</p>
      <p><strong>Army:</strong> {{ selectedArmy }}</p>
      <p><strong>Point List:</strong> {{ pointList }}</p>
      <p><strong>Detachment:</strong> {{ selectedDetachment }}</p>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  const props = defineProps({
    name: {
      type: String,
      required: true
    },
    selectedArmy: {
      type: String,
      required: true
    },
    pointList: {
      type: String,
      required: true
    },
    selectedDetachment: {
      type: String,
      required: true
    }
  });
  </script>
  
  