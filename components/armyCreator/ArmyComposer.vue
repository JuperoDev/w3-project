<template>
  <div>
    <p><strong>Name:</strong> {{ name }}</p>
    <p><strong>Army:</strong> {{ selectedArmy }}</p>
    <p><strong>Point List:</strong> {{ pointList }}</p>
    <p><strong>Detachment:</strong> {{ selectedDetachment }}</p>
    <p><strong>URL:</strong> {{ url }}</p> <!-- Display the passed URL -->

    <Character :url="url" class="mt-4"/>
    <Battleline :url="url" class="mt-4"/>
    <Other :url="url" class="mt-4"/>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import Character from './Character.vue';
import Battleline from './Battleline.vue';
import Other from './Other.vue';

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
  },
  url: {
    type: String,
    required: true
  }
});
</script>
