<template>
  <div class="datasheet-desktop__container pb-5 pt-2">
   
    <div class="datasheet-desktop__header py-5 bg-zinc-900">
      <div class="color-stripe bg-zinc-500 h-20 ">
        <h1 class="uppercase font-bebas text-4xl text-zinc-200 px-5 py-3">
          {{ parentUnit }}
          
          <GeneralPurposeFavIcon :parentUnit="parentUnit" 
    :urlStore="urlStore"/>
        </h1>
        
      </div>
      <DesktopComponentsAttributes :attributes="attributes" />
    </div>
    <div
      class="datasheet-desktop--grid-container grid grid-cols-5 border-t-0  bg-white border-r-2 border-b-2 border-l-2 border-solid border-slate-700"
    >
      <div class="datasheet-desktop__grid-container--left col-span-3 ">
        
        <DesktopComponentsRangedWeapons
          :rangedWeapons="rangedWeapons"
          v-if="rangedWeapons && rangedWeapons.length > 0"
        />

        <DesktopComponentsMeleeWeapons :meleeWeapons="meleeWeapons" />

        <DesktopComponentsAdditionalParameter  v-if="!isEmptyObject(additionalParameter)"
          :additionalParameter="additionalParameter"
        />

        <!-- Conditional rendering for wargear component -->
        <DesktopComponentsWargear v-if="wargear && wargear.length > 0" :wargear="wargear" />
      </div>
      <div
        class="datasheet-desktop__grid-container--right border-l-2 border-slate-700 col-span-2"
      >
        <DesktopComponentsAbilities :abilities="abilities" />

        <DesktopComponentsWargearAbility :warGearAbilities="warGearAbilities" v-if="warGearAbilities"/>

        
        <DesktopComponentsDamaged :damaged="damaged" v-if="!isEmptyObject(damaged)" />

<!-- REMOVE FOR ALPHA -->

         <DesktopComponentsUnitComposition
          :options="options"
          :unitComposition="unitComposition"
          :equipment="equipment"
        /> 

<!-- *********************** -->

<DesktopComponentsTransport :transport="transport" v-if="transport"/>
      

        <DesktopComponentsLeader :leader="leader" :leaderInfo="leaderInfo" v-if="leader.length > 0" />

        <DesktopComponentsSupremeCommander v-if="supremeCommander" />
      </div>
    </div>

    <div class="keywords-container ">
      <DesktopComponentsKeywords
        :keywords="keywords"
        :factionKeyword="factionKeyword"
      />
    </div>
  </div>

</template>
<script setup>
const props = defineProps({
  parentUnit: String,
    urlStore: String,
  armyUnit: String,
  abilities: Object,
  warGearAbilities: Object,
  keywords: Array,
  factionKeyword: Array,
  attributes: Array,
  meleeWeapons: Array,
  additionalParameter: Object,
  rangedWeapons: Array,
  wargear: {
    type: Array,
    default: () => [],
  },
  leader: Array,
  leaderInfo: String,
  supremeCommander: Boolean,
  transport: String,
  
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
  margin: 0 auto;
}
</style>
