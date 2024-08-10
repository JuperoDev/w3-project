<template>
  <div>
    <div class="unit-composition__wrap mb-3">
    <div
      v-for="(unit, index) in unitComposition"
      :key="unit.unitType"
      :class="{
        'bg-zinc-200 text-gray-900 py-1  border-b-2 border-solid border-zinc-400': (index + 1) % 2 === 0,
        'bg-white text-gray-900 py-1  border-b-2 border-solid border-zinc-400': (index + 1) % 2 !== 0,
      }"
     
    >
      <div class="unit-composition__container flex m-2">
        <p>
          <template v-if="unit.minQuantity == unit.maxQuantity">
            {{ unit.minQuantity }}
          </template>
          <template v-if="unit.minQuantity !== unit.maxQuantity">
            {{ unit.minQuantity }} - {{ unit.maxQuantity }}
          </template>
        </p>

        <p class="capitalize px-2">
          <div class="unit-composition__equiment-grid">
            {{ unit.unitType }}
          </div>
        </p>
      </div>
   
   
    </div>
  </div>

    <br />
    <div class="datasheet-desktop__section-header bg-zinc-900 text-zinc-100 rounded-t-lg p-3">
          <p>Equipment</p>
        </div>
        <p v-for="(unit, index) in unitComposition" :key="index" 
        
        :class="{
        'bg-zinc-200 capitalize text-gray-900 py-2 px-2  border-b-2 border-solid border-zinc-400': (index + 1) % 2 === 0,
        'bg-white capitalize text-gray-900 py-2 px-2 border-b-2 border-solid border-zinc-400': (index + 1) % 2 !== 0,
      }"
        
        
        >


    <b>{{ unit.unitType }}:</b> {{ unit.equipment.join(', ') }}
   
  </p>

    

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
