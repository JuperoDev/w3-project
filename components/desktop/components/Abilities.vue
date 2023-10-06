<template>
    <div
          class="datasheet-desktop__section-header"
        >
        <div class="datasheet-desktop__section-header  bg-zinc-900 text-zinc-100 rounded-t-lg p-3 m-3">
          <p>Abilities</p>
        </div>
        <div class="abilities-container p-3">
          <div class="faction-container" v-if="abilities.core && abilities.core.length > 0"  >
        <span class="font-semibold">Core: </span>
        
         <span v-for="ability in abilities.core" class="capitalize">{{ ability }}, </span> 
          </div>
      

      <div class="faction-container" v-if="abilities.faction && abilities.faction.length > 0" >
      <span class="font-semibold">Faction: </span>
      <span class="capitalize" v-for="ability in abilities.faction" >
          {{ ability }}, 
      </span>
    </div>

    <div class="faction-container" v-if="abilities.otherAbilities && abilities.otherAbilities.length > 0" >
      <div v-for="(otherAbility, index) in abilities.otherAbilities" :key="'misc-' + index">
          <span class="font-semibold">{{ otherAbility.name }} : </span> <span>{{ otherAbility.description }}</span>
      </div>
    </div>
        </div>
      </div>
</template>

<script setup>

const props = defineProps({
  abilities: Object
});
</script>
