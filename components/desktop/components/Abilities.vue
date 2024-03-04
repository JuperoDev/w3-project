<template>
    <div
          class="datasheet-desktop__section-header"
        >
        <div class="datasheet-desktop__section-header  bg-zinc-900 text-zinc-100 rounded-t-lg p-3 m-3">
          <p>Abilities</p>
        </div>
        <div class="abilities-container p-3">
          <div class="core-container border-b-2 border-dotted border-slate-400" v-if="abilities.core && abilities.core.length > 0"  >
        <span class="font-semibold ">Core: </span>
        
         <!-- <span v-for="ability in abilities.core" class="capitalize">{{ ability }}, </span>  -->
         <div class="flex ">
         <span v-for="ability in abilities.core" class="capitalize mr-2 border-dashed border-2 mx-2 border-zinc-400 p-1  mb-2 hover:border-zinc-700 hover:bg-zinc-700 hover:text-zinc-200"  style="cursor: pointer;"><GeneralPurposeModifierDialog :modifier="ability"/> </span> 
        </div>
          </div>
      

      <div class="faction-container border-b-2 border-dotted border-slate-400" v-if="abilities.faction && abilities.faction.length > 0" >
      <span class="font-semibold">Faction: </span>
      <span class="capitalize" v-for="ability in abilities.faction" >
          {{ ability }}, 
      </span>
    </div>

    <div class="other-abilities-container" v-if="abilities.otherAbilities && abilities.otherAbilities.length > 0" >
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
