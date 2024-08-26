<template>
  <div>
   
      
        <!-- Content inside the collapsible div -->

        <div
          v-for="weapon in rangedWeapons"
          :key="weapon.name"
          class="newStats"
        >
          <div
            class="weaponName uppercase bg-zinc-900 text-slate-50 m-2 p-3 rounded-lg font-semibold flex"
          >
          <div
          class="arrow bg-zinc-100 mt-1 mr-3"
          v-if="weapon.singleChoice"
        ></div>
            <h2>{{ weapon.name }}</h2>
          </div>


          <div
            class="allContainer grid grid-cols-6 px-3 py-2 bg-zinc-300 font-semibold"
          >
            <div class="col flex justify-center items-center">RANGE</div>
            <div class="col flex justify-center items-center">A</div>
            <div class="col flex justify-center items-center">BS</div>
            <div class="col flex justify-center items-center">S</div>
            <div class="col flex justify-center items-center">AP</div>
            <div class="col flex justify-center items-center">D</div>
          </div>

          <div class="allContainer grid grid-cols-6 px-3 py-2">
            <div class="col flex justify-center items-center">
              {{ weapon.range }}
            </div>
            <div class="col flex justify-center items-center">
              {{ weapon.attacks }}
            </div>
            <div class="col flex justify-center items-center">
              {{ weapon["ballistic-skills"] }}
            </div>
            <div class="col flex justify-center items-center">
              {{ weapon.strength }}
            </div>
            <div class="col flex justify-center items-center">
              {{ weapon["armor-penetration"] }}
            </div>
            <div class="col flex justify-center items-center">
              {{ weapon.damage }}
            </div>
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
        Before selecting targets for this weapon, select one of its profiles to
        make attacks with.
      </p>
    </div>
  </div>
</template>
<script setup>


const props = defineProps({
  rangedWeapons: Array,Boolean
});

const showDownArrow = computed(() => {
  // Check if any of the weapons have singleChoice set to true
  return props.rangedWeapons.some((weapon) => weapon.singleChoice);
});
</script>

<style scoped>
.arrow {
  clip-path: polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 0% 0%);
  height: 15px;
  width: 25px;
}
</style>