<template>
  <div class="ranged-weapons__container">
    
    <div
      class="datasheet-desktop__section-header bg-zinc-900 text-zinc-100 rounded-t-lg p-3 m-3 grid grid-cols-2"
    >
      <div class="datasheet-desktop__section-title">
        <p>Ranged Weapons</p>
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
      class="ranged-weapons__weapon m-3 grid grid-cols-2  border-b-2  border-dotted border-slate-400 "  v-for="weapon in rangedWeapons"
    >
    <div class="datasheet-desktop__section-title flex">
        <div class="arrow bg-zinc-900 mt-1 mr-1" v-if="weapon.singleChoice"></div>
        
        <p class="capitalize">{{ weapon.name }}</p>
      </div>

      <div
        class="datasheet-desktop__section-stats grid grid-cols-6 text-center"
      >
        <p>{{ weapon.range }}</p>
        <p> {{ weapon.attacks }}</p>
        <p> {{ weapon["ballistic-skills"] }}</p>
        <p>{{ weapon.strength }}</p>
        <p>{{ weapon["armor-penetration"] }}</p>
        <p>{{ weapon.damage }}</p>
      </div>
      <div class="flex flex-wrap">
              <span
                v-for="(modifier, index) in weapon.modifiers"
                :key="index"
                class="modifiers border-dashed border-2 mx-2 border-zinc-400 p-1 mr-2 mb-2 hover:border-zinc-700 hover:bg-zinc-700 hover:text-zinc-200"
                style="cursor: pointer;">
                <!-- {{ modifier }} -->
                <GeneralPurposeModifierDialog :modifier="modifier"/>
              </span>
              
            </div>
            
    </div>
    <div class="downarrow flex mt-10 ml-3" v-if="showDownArrow">
      <div class="arrow bg-zinc-900 mt-1 mr-3"></div>
      <p class="italic">
        Before selecting targets for this weapon, select one of its profiles to make attacks with.
      </p>
    </div>
  </div>
</template>

<script setup>
 const props = defineProps ({
  rangedWeapons: Array
 })

 const showDownArrow = computed(() => {
  // Check if any of the weapons have singleChoice set to true
  return props.rangedWeapons.some(weapon => weapon.singleChoice);
});
</script>

<style scoped>
.arrow {
  clip-path: polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 0% 0%);
  height: 15px;
  width: 25px;
}
</style>
