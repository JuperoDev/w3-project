<template>
  <div class="datasheet-desktop__container mt-5 mx-2">
    
    <div class="datasheet-desktop__header py-5">
      <div class="color-stripe bg-zinc-500 h-20 z-1">
        <h1 class="uppercase font-bebas text-4xl text-zinc-200 px-5 py-3">
          {{ armyUnit }}
          
        </h1>
      </div>
      <DesktopComponentsAttributes :attributes="attributes"/>
    </div>
    <div
      class="datasheet-desktop--grid-container grid grid-cols-3 border-t-0 border-r-2 border-b-2 border-l-2 border-solid border-slate-700 mx-2"
    >
      <div class="datasheet-desktop__grid-container--left col-span-2">
        <DesktopComponentsRangedWeapons :rangedWeapons="rangedWeapons" />

        <DesktopComponentsMeleeWeapons :meleeWeapons="meleeWeapons" />

        <DesktopComponentsWargear :wargear="wargear" />
      </div>
      <div
        class="datasheet-desktop__grid-container--right border-l-2 border-slate-700"
      >
        <DesktopComponentsAbilities />

        <DesktopComponentsUnitComposition />

        <DesktopComponentsLeader />
      </div>
    </div>

    <div class="keywords-container">
     <DesktopComponentsKeywords :keywords="keywords" :factionKeyword="factionKeyword"/>
    </div>
  </div>
</template>
<script setup>

const props = defineProps({
    armyUnit: String,
    keywords: Array,
    factionKeyword: Array,
    attributes: Array,
    meleeWeapons: Array,
    rangedWeapons: Array,
    wargear: Array
    
});

</script>
<style scoped>


.datasheet-desktop__container {
  width: 1200px;
}

.datasheet-desktop__header {
  height: 180px;
}

.color-stripe {
  clip-path: polygon(
    0% 0%,
    100% 0%,
    100% 43%,
    49.06% 43%,
    47.3% 44%,
    45.8% 49.37%,
    44.3% 59.49%,
    42.6% 73.42%,
    41.27% 85.24%,
    39.83% 93.24%,
    38.1% 97.47%,
    36% 100%,
    0% 100%
  );
}

.datasheet-desktop__header {
  background-image: url("@/public/background/tzeentch_bg_desktop.png");
}
</style>
