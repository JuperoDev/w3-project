<template>
    <div class="bg-gray-800 p-4 rounded-lg shadow-md text-white">
      <div class="flex justify-between items-center">
        <h2 class="text-lg font-semibold">Battleline</h2>
        <button @click="addUnit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Unit
        </button>
      </div>
      <p><strong>URL:</strong> {{ url }}</p>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  const props = defineProps({
    url: {
      type: String,
      required: true
    }
  });
  
  const addUnit = () => {
    console.log('Add Battleline Unit');
  };
  </script>
  
 