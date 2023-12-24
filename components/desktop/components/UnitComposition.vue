<template>
    <div
          class="datasheet-desktop__section-header  m-3"
        >
        <div class="datasheet-desktop__section-header bg-zinc-900 text-zinc-100 rounded-t-lg p-3">
          <p>Unit Composition</p>
        </div>

        <div v-for="unit in unitComposition" :key="unit.unitType" 
        
        >
          <div class="unit-composition__container flex m-2">
            <p>
        <template v-if="unit.minQuantity == unit.maxQuantity">
          {{ unit.minQuantity }}</template
        >
        <template v-if="unit.minQuantity !== unit.maxQuantity"
          >{{ unit.minQuantity }} - {{ unit.maxQuantity }}</template
        >


      </p>

      <p class="capitalize px-2">
<div class="unit-composition__equiment-grid">
  {{ unit.unitType }}
</div>
   
</p>

          </div>
     

        </div>
        <p>Equipment: </p>
        <p v-for="(unit, index) in unitComposition" :key="index" class="capitalize">
    <b>{{ unit.unitType }}:</b> {{ unit.equipment.join(', ') }}
   
  </p>

    <br />
    <!-- <p class="py-2">Every model is equipped with:</p>
    <div v-for="equip in equipment" class="px-5 capitalize">
      <ul>
        <li>
          
          {{ equip }}
        </li>
      </ul>
    </div> -->
    <br />

    <br />
    <div class="grid grid-cols-4 bg-zinc-900 text-zinc-100 rounded-t-lg p-3">
      <p class="col-span-2 m-auto">Model name</p>
      <p class="m-auto">Count</p>
      <p class="m-auto">Points</p>
    </div>

    <div class="grid grid-row grid-cols-4" v-for="option in options">
      <div class="col-span-2">
        <div class=" items-center capitalize p-3">
          <div v-for="unit in unitComposition">
            <p>{{ unit.unitType }} </p>
            <br/>
          </div>
        </div>
      </div>

      <div>
        <div class="p-3 flex justify-center" v-for="count in option.count">
          <p>{{ count }}</p>
        </div>
      </div>

      <div class="p-3 flex justify-center">
        <p class="-ml-4">{{ option.points }}</p>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  equipment: {
    type: Array,
    default: () => [],
  },
  unitComposition: {
    type: Array,
    default: () => [],
  },
  options: {
    type: Array,
    default: () => [],
  },
});
</script>