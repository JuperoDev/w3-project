<template>
  <div class ="attributes-desktop-container  grid grid-cols-3">
   
    <div class="datasheet__header" >
    <!-- boxes -->
    <div v-for="attribute in attributes" :key="attribute.id">
      <div class="bg-zinc-900 capitalize px-3 py-2 mt-2 text-zinc-50 rounded-md"><h2>{{ attribute.name }}</h2></div>
      
  <div class="datasheet__header--stats grid grid-cols-6 place-items-center text-zinc-100 font-semibold">
    <!-- Single Box -->
    <div class="datasheet__header--stats-single grid place-items-center z-40">
      <p>M</p>
      <div class="datasheet__header--stats-single-box p-1 w-11 h-11 bg-zinc-500 text-zinc-900">
        <div class="datasheet__header--stats-single-box w-9 h-9 bg-slate-200 grid place-items-center">
          {{ attribute.movement }} "
        </div>
      </div>
    </div>
    <!-- end Single Box -->

    <!-- Single Box -->
    <div class="datasheet__header--stats-single grid place-items-center z-40">
      T
      <div class="datasheet__header--stats-single-box p-1 w-11 h-11 bg-zinc-500 text-zinc-900">
        <div class="datasheet__header--stats-single-box w-9 h-9 bg-slate-200 grid place-items-center">
          {{ attribute.toughness }}
        </div>
      </div>
    </div>
    <!-- end Single Box -->

    <!-- Single Box -->
    <div class="datasheet__header--stats-single grid place-items-center z-40">
      SV
      <div class="datasheet__header--stats-single-box p-1 w-11 h-11 bg-zinc-500 text-zinc-900">
        <div class="datasheet__header--stats-single-box w-9 h-9 bg-slate-200 grid place-items-center">
          {{ attribute.save }}+
        </div>
      </div>
    </div>
    <!-- end Single Box -->

    <!-- Single Box -->
    <div class="datasheet__header--stats-single grid place-items-center z-40">
      W
      <div class="datasheet__header--stats-single-box p-1 w-11 h-11 bg-zinc-500 text-zinc-900">
        <div class="datasheet__header--stats-single-box w-9 h-9 bg-slate-200 grid place-items-center">
          {{ attribute.wounds }}
        </div>
      </div>
    </div>
    <!-- end Single Box -->

    <!-- Single Box -->
    <div class="datasheet__header--stats-single grid place-items-center z-40">
      LD
      <div class="datasheet__header--stats-single-box p-1 w-11 h-11 bg-zinc-500 text-zinc-900">
        <div class="datasheet__header--stats-single-box w-9 h-9 bg-slate-200 grid place-items-center">
          {{ attribute.leadership }}+
        </div>
      </div>
    </div>
    <!-- end Single Box -->

    <!-- Single Box -->
    <div class="datasheet__header--stats-single grid place-items-center z-40">
      OC
      <div class="datasheet__header--stats-single-box p-1 w-11 h-11 bg-zinc-500 text-zinc-900">
        <div class="datasheet__header--stats-single-box w-9 h-9 bg-slate-200 grid place-items-center">
          {{ attribute.objetiveControl }}
        </div>
      </div>
    </div>
    <!-- end Single Box -->
  </div>

  <!-- Invulnerable Save -->
  <div class="invulnerable-save text-slate-200 col-span-3 italic mt-3 ml-3" v-if="attribute.invulnerableSave">
    <p>Invulnerable save: {{ attribute.invulnerableSave }}+ </p>
    <small><p>{{ attribute.invulnerableSaveMod }}</p></small>
  </div>
</div>
   
    </div>
    <!-- end boxes  -->

    <div class="attributes-desktop-container--right"></div>
  </div>
</template>
<script setup>

const props = defineProps({
  attributes: Array
});
</script>
<style scoped>
.datasheet__header--stats-single-box {
  clip-path: polygon(
    20% 0%,
    80% 0%,
    100% 0,
    100% 80%,
    80% 100%,
    20% 100%,
    0 100%,
    0% 20%
  );
}
</style>
