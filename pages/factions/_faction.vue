<template>
    <div>
      <h1>{{ factionName }}</h1>
      <!-- Add faction-specific content here -->
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  
  const factionName = ref('');
  
  onMounted(() => {
    // Get the current URL path to extract the faction name
    const currentPath = window.location.pathname;
    // Assuming the faction name is the second part of the URL path
    const parts = currentPath.split("/");
    factionName.value = parts[1];
  });
  </script>
  
  <style>
  /* Add any custom styles specific to factions if needed */
  </style>
  