<template>
  <div class="abilities-container p-3">
    <div class="singe-ability-check" v-if="abilities.core && abilities.core.length > 0">
        <span class="font-semibold">Core: </span>
        
         <span v-for="ability in abilities.core" class="capitalize">{{ ability }}, </span> 
        </div>
      <div class="singe-ability-check" v-if="abilities.faction && abilities.faction.length > 0">
      <span class="font-semibold">Faction: </span>
      <span class="capitalize" v-for="ability in abilities.faction" >
          {{ ability }}, 
      </span>
    </div>
      <div class="singe-ability-check" v-if="abilities.otherAbilities && abilities.otherAbilities.length > 0">
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
