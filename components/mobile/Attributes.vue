<template>
  <div>


    <div class="datasheet__header py-5"  v-for="attribute in attributes">
      <div class="attribute-name capitalize text-lg px-6">

        <h1>{{ attribute.name }}</h1>
      </div>
    

    <!-- boxes -->
    <div class="datasheet__header--stats grid grid-cols-6 place-items-center">
      
      <!-- Single box -->

      <div class="datasheet__header--stats-single grid place-items-center">
        M
        <div
          class="datasheet__header--stats-single-box p-1 w-11 h-11 bg-zinc-500 text-zinc-900"
        >
          <div
            class="datasheet__header--stats-single-box w-9 h-9 bg-slate-200 grid place-items-center"
          >
            {{ attribute.movement }} "
          </div>
        </div>
      </div>

      <!-- Single box -->

      <div class="datasheet__header--stats-single grid place-items-center">
        T
        <div
          class="datasheet__header--stats-single-box p-1 w-11 h-11 bg-zinc-500 text-zinc-900 grid place-items-center"
        >
          <div
            class="datasheet__header--stats-single-box w-9 h-9 bg-slate-200 grid place-items-center"
          >
            {{ attribute.toughness }}
          </div>
        </div>
      </div>

      <!-- Single box -->

      <div class="datasheet__header--stats-single grid place-items-center">
        S
        <div
          class="datasheet__header--stats-single-box p-1 w-11 h-11 bg-zinc-500 text-zinc-900 grid place-items-center"
        >
          <div
            class="datasheet__header--stats-single-box w-9 h-9 bg-slate-200 grid place-items-center"
          >
            {{ attribute.save }} +
          </div>
        </div>
      </div>

      <!-- Single box -->

      <div class="datasheet__header--stats-single grid place-items-center">
        W
        <div
          class="datasheet__header--stats-single-box p-1 w-11 h-11 bg-zinc-500 text-zinc-900 grid place-items-center"
        >
          <div
            class="datasheet__header--stats-single-box w-9 h-9 bg-slate-200 grid place-items-center"
          >
            {{ attribute.wounds }}
          </div>
        </div>
      </div>

      <!-- Single box -->

      <div class="datasheet__header--stats-single grid place-items-center">
        L
        <div
          class="datasheet__header--stats-single-box p-1 w-11 h-11 bg-zinc-500 text-zinc-900 grid place-items-center"
        >
          <div
            class="datasheet__header--stats-single-box w-9 h-9 bg-slate-200 grid place-items-center"
          >
            {{ attribute.leadership }}
          </div>
        </div>
      </div>

      <!-- Single box -->

      <div class="datasheet__header--stats-single grid place-items-center">
        OC
        <div
          class="datasheet__header--stats-single-box p-1 w-11 h-11 bg-zinc-500 text-zinc-900 grid place-items-center"
        >
          <div
            class="datasheet__header--stats-single-box w-9 h-9 bg-slate-200 grid place-items-center"
          >
             {{ attribute.objetiveControl }} 
          </div>
        </div>
      </div>
    </div>
    <div class="invulnerable-save text-slate-900 col-span-3 italic mt-3 ml-5" v-if="attribute.invulnerableSave">
      <p>Invulnerable save: {{ attribute.invulnerableSave }}+</p>
    <small><p>{{ attribute.invulnerableSaveMod }}</p></small>
    </div>
    <!-- end boxes  -->
</div>
  </div>
</template>

<script setup>

const props = defineProps({
  attributes: Array,Boolean
});
</script>

<style>
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
