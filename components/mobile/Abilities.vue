<template>
  <div class="abilities-container p-3">
    <div
      class="singe-ability-check"
      v-if="abilities.core && abilities.core.length > 0"
    >
      <span class="font-semibold">Core: </span>

      <div class="flex ">
         <span v-for="ability in abilities.core" class="capitalize mr-2 border-dashed border-2 mx-2 border-zinc-400 p-1  mb-2 hover:border-zinc-700 hover:bg-zinc-700 hover:text-zinc-200"  style="cursor: pointer;"><GeneralPurposeModifierDialog :modifier="ability"/> </span> 
        </div>
    </div>
    <div
      class="singe-ability-check"
      v-if="abilities.faction && abilities.faction.length > 0"
    >
      <span class="font-semibold">Faction: </span>
      <!-- <span class="capitalize" v-for="ability in abilities.faction">
        {{ ability }},
      </span> -->
      <div class="flex ">
         <span v-for="ability in abilities.faction" class="capitalize mr-2 border-dashed border-2 mx-2 border-zinc-400 p-1  mb-2 hover:border-zinc-700 hover:bg-zinc-700 hover:text-zinc-200"  style="cursor: pointer;"><GeneralPurposeModifierDialog :modifier="ability"/> </span> 
        </div>
        
    </div>
    <div
      class="singe-ability-check"
      v-if="abilities.otherAbilities && abilities.otherAbilities.length > 0"
    >
      <div
        v-for="(otherAbility, index) in abilities.otherAbilities"
        :key="'misc-' + index"
      >
        <span class="font-semibold">{{ otherAbility.name }} : </span>
        <span v-html="otherAbility.description"></span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  abilities: Object,
});
</script>
