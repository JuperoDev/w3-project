<template>
  <div class="ranged-weapons__container">
    <div
      class="datasheet-desktop__section-header bg-zinc-900 text-zinc-100 rounded-t-lg p-3 m-3 grid grid-cols-2"
    >
      <div class="datasheet-desktop__section-title">
        <p>Ranged Weapons</p>
      </div>

      <!-- <div
        class="datasheet-desktop__section-stats grid grid-cols-6 text-center"
      >
        <p>Range</p>

        <p>A</p>
        <p>BS</p>
        <p>S</p>
        <p>AP</p>
        <p>D</p>
      </div> -->
    </div>

    <div
      class="ranged-weapons__weapon pt-1 pb-2 px-5 border-b-2 border-dotted border-slate-400"
      v-for="(weapon, index) in rangedWeapons"
      :key="weapon.name"
      :class="{
        'bg-zinc-100 text-gray-700 ': (index + 1) % 2 === 0,
        'bg-white text-gray-700  ': (index + 1) % 2 !== 0,
      }"
    >
      <div
        class="weaponName uppercase text-zinc-900 m-1 p-1 font-semibold flex"
      >
        <div
          class="arrow bg-zinc-900 mt-1 mr-3"
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
          style="cursor: pointer"
        >
          <!-- {{ modifier }} -->
          <GeneralPurposeModifierDialog :modifier="modifier" />
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
  rangedWeapons: Array,
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