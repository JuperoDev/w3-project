<template>
  <div class="datasheet-desktop__container mt-5 mx-2">
    <div class="datasheet-desktop__header py-5 bg-slate-950">
      <div class="color-stripe bg-zinc-500 h-20 z-1">
        <h1 class="uppercase font-bebas text-4xl text-zinc-200 px-5 py-3">
          {{ armyUnit }}
        </h1>
      </div>
      <DesktopComponentsAttributes :attributes="attributes" />
    </div>
    <div
      class="datasheet-desktop--grid-container grid grid-cols-5 border-t-0 border-r-2 border-b-2 border-l-2 border-solid border-slate-700 mx-2"
    >
      <div class="datasheet-desktop__grid-container--left col-span-3">
        <DesktopComponentsRangedWeapons
          :rangedWeapons="rangedWeapons"
          v-if="rangedWeapons && rangedWeapons.length > 0"
        />

        <DesktopComponentsMeleeWeapons :meleeWeapons="meleeWeapons" />

        <DesktopComponentsAdditionalParameter  v-if="!isEmptyObject(additionalParameter)"
          :additionalParameter="additionalParameter"
        />

        <DesktopComponentsWargear :wargear="wargear" />
      </div>
      <div
        class="datasheet-desktop__grid-container--right border-l-2 border-slate-700 col-span-2"
      >
        <DesktopComponentsAbilities :abilities="abilities" />

        <DesktopComponentsWargearAbility :warGearAbilities="warGearAbilities"/>

        <!-- Add a v-if directive to conditionally render the damaged component -->
        <DesktopComponentsDamaged :damaged="damaged" v-if="!isEmptyObject(damaged)" />

        <DesktopComponentsUnitComposition
          :options="options"
          :unitComposition="unitComposition"
          :equipment="equipment"
        />

        <DesktopComponentsLeader :leader="leader" v-if="leader.length > 0" />

        <DesktopComponentsSupremeCommander v-if="supremeCommander" />
      </div>
    </div>

    <div class="keywords-container">
      <DesktopComponentsKeywords
        :keywords="keywords"
        :factionKeyword="factionKeyword"
      />
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  armyUnit: String,
  abilities: Object,
  warGearAbilities: Object,
  keywords: Array,
  factionKeyword: Array,
  attributes: Array,
  meleeWeapons: Array,
  additionalParameter: Object,
  rangedWeapons: Array,
  wargear: Array,
  leader: Array,
  supremeCommander: Boolean,
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
  damaged: Object,
});

// Define a method to check if an object is empty
const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0;
};
</script>
<style scoped>
.datasheet-desktop__container {
  width: 1200px;
}

.datasheet-desktop__header {
  height: 220px;
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
</style>
