<template>
  <div
    class="datasheet-desktop--grid-container grid grid-cols-12 mx-2 -mt-4 border-b-2 border-l-2 border-r-2 border-solid border-slate-700"
  >
    <div class="emptycolumn col-span-1"></div>
    <!-- border-t-0 border-r-2 border-b-2 border-l-2 border-solid border-slate-700 -->
    <div class="datasheet-desktop__grid-container--left p-8 col-span-7  -ml-24 -mt-4">
      <span>Keywords: </span>
      <div class="flex space-x-5">
        <p class="uppercase text-sm font-semibold" v-for="keyword in keywords">
          <span>{{ keyword }} </span>
        </p>
      </div>
    </div>

    <div class="diamond bg-slate-700 col-span-1"></div>
    <div class="texto col-span-3 p-8 -ml-20 -m-4">
      
      <span>Faction Keywords: </span>
      <div class="flex space-x-5">
        <p class="uppercase text-sm font-semibold" v-for="keyword in factionKeyword">
          <span>{{ keyword }} </span>
        </p>
      </div>

    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  keywords: Array,
  factionKeyword: Array
});
</script>
<style scoped>
.diamond {
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  height: 80px;
  width: 80px;
  margin-left: -39px;
}

.datasheet-desktop--grid-container {
  height: 68px;
}

div {
}
</style>
