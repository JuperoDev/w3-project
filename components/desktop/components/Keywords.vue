<template>
  <div
    class="datasheet-desktop--grid-container grid grid-cols-12 bg-white border-b-2 border-l-2 border-r-2 border-solid border-slate-700"
  >
    <div class="emptycolumn col-span-1"></div>
    <!-- border-t-0 border-r-2 border-b-2 border-l-2 border-solid border-slate-700 -->
    <div class="datasheet-desktop__grid-container--left px-8 pt-5 col-span-7  -ml-24 -mt-4" style="max-width: 100%;">
  <span>Keywords: </span>
  <div class="flex flex-wrap space-x-5" style="max-width: calc(100% - 60px);"> <!-- Adjust space as per your requirement -->
    <p class="uppercase text-xs font-semibold" v-for="keyword in keywords">
      {{ keyword }}
    </p>
  </div>
</div>

    <!-- <div class="diamond bg-slate-700 col-span-1 "></div> -->
    <div class="texto col-span-3  -my-4 -mx-16 pt-5">
      
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
  height: 80px;
}

div {
/* border: solid 1px red; */
}
</style>
