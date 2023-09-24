<template>
  <div class="melee-weapons__container">
   
    <div
      class="datasheet-desktop__section-header bg-slate-400 m-3 grid grid-cols-2"
    >
      <div class="datasheet-desktop__section-title">
        <p>Melee Weapons</p>
      </div>

      <div
        class="datasheet-desktop__section-stats grid grid-cols-6 text-center"
      >
        <p>Range</p>

        <p>A</p>
        <p>BS</p>
        <p>S</p>
        <p>AP</p>
        <p>D</p>
      </div>
    </div>

    <div
      class="ranged-weapons__weapon   border-b-2  border-dotted border-slate-400 m-3 grid grid-cols-2" v-for="weapon in meleeWeapons"
    >
      <div class="datasheet-desktop__section-title">
        <p class="capitalize">{{weapon.name}}</p>
      </div>

      <div
        class="datasheet-desktop__section-stats grid grid-cols-6 text-center"
      >
        <p>Melee</p>

        <p>{{ weapon.attacks }}</p>
        <p>{{ weapon['weapons-skills'] }}</p>
        <p>{{ weapon.strength }}</p>
        <p>{{ weapon['armor-penetration'] }}</p>
        <p>{{ weapon.damage }}</p>
      </div>
    </div>

    

  </div>
</template>


<script setup>

const props = defineProps({
  meleeWeapons: Array
});

</script>