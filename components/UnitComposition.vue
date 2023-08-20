<template>
  <div>
    <div v-for="unit in unitComposition" :key="unit.unitType">
      <p>
        <template v-if="unit.minQuantity == unit.maxQuantity">
          {{ unit.minQuantity }}</template
        >
        <template v-if="unit.minQuantity !== unit.maxQuantity"
          >{{ unit.minQuantity }} - {{ unit.maxQuantity }}</template
        >

        <p class="capitalize">

          {{ unit.unitType }}
        </p>
      </p>
    </div>

    <br />
    <p>Every model is equipped with:</p>
    <div v-for="equip in equipment" class="px-3">
      <ul>
        <li>
          
          {{ equip }}
        </li>
      </ul>
    </div>
    <br />

    <br />
    <div class="grid grid-cols-4 bg-zinc-900 text-zinc-100 rounded-t-lg p-3">
      <p class="col-span-2 m-auto">Model name</p>
      <p class="m-auto">Count</p>
      <p class="m-auto">Points</p>
    </div>

    <div class="grid grid-row grid-cols-4" v-for="option in options">
      <div class="col-span-2">
        <div class="flex justify-center items-center capitalize p-3">
          <div v-for="unit in unitComposition">
            <p>{{ unit.unitType }}</p>
          </div>
        </div>
      </div>

      <div>
        <div class="p-3 flex justify-center" v-for="count in option.count">
          <p>{{ count }}</p>
        </div>
      </div>

      <div class="p-3 flex justify-center">
        <p>{{ option.points }}</p>
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
