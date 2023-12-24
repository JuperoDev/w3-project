<template>
    <div class="datasheet-desktop__section-header">
      <!-- <div class="datasheet-desktop__section-header bg-zinc-900 text-zinc-100 rounded-t-lg p-3 m-3">
        <p>Wargear Abilities</p>
      </div>
      <div class="abilities-container p-3">
        <div class="other-abilities-container" v-if="abilities && abilities.warGearAbilities && abilities.warGearAbilities.length > 0">
          <div v-for="(warGearAbility, index) in abilities.warGearAbilities" :key="'misc-' + index">
            <span class="font-semibold">{{ warGearAbility.wargear }} : </span>
            <span>{{ warGearAbility.ability }}</span>
          </div>
        </div>
      </div> -->
      {{ warGearAbilities }}
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    warGearAbilities: Object
  });
  </script>
  