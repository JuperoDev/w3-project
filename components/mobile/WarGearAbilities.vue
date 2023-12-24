<template>
    <div class="abilities-container p-3">
      
      <div class="datasheet-desktop__section-header bg-zinc-900 text-zinc-100 rounded-t-lg p-3 m-3">
        <p>Wargear Abilities</p>
      </div>
      
      <div class="wargear-abilities--display p-3">
      <div class="wargear-abilities--display__element" v-for="(ability, index) in warGearAbilities" :key="index">
        <p><strong>{{ ability.wargear }}</strong></p>
        <p>{{ ability.ability }}</p>
      </div>
    </div>

        
          </div>
  </template>
  
  <script setup>
  
  const props = defineProps({
    warGearAbilities: Object
  });
  </script>
  