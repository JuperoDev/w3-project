<template>
    <div
          class="datasheet-desktop__section-header"
        >
        <div class="datasheet-desktop__section-header bg-slate-400 m-3">
          <p>Abilities</p>
        </div>
        <div class="abilities-container p-3">
        <span class="font-semibold">Core: </span>
        
         <span v-for="ability in abilities.core" class="capitalize">{{ ability }}, </span> 
      <br/>
      <span class="font-semibold">Faction: </span>
      <span class="capitalize" v-for="ability in abilities.faction" >
          {{ ability }}, 
      </span>
      <div v-for="(otherAbility, index) in abilities.otherAbilities" :key="'misc-' + index">
          <span class="font-semibold">{{ otherAbility.name }} : </span> <span>{{ otherAbility.description }}</span>
      </div>
 
        </div>
      </div>
</template>

<script setup>

const props = defineProps({
  abilities: Object
});
</script>
