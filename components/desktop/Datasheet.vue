<template>
  <div class="datasheet-desktop__container mt-5 mx-2">
    <div class="datasheet-desktop__header bg-zinc-800 py-5">
      <div class="color-stripe bg-blue-300 h-20">
        <h1 class="uppercase font-bebas text-4xl text-zinc-800 px-5 py-3">Neurotyrant</h1>

      </div>
              <!-- caja -->
              <div
          class="datasheet__header--stats-single-box p-1 w-11 h-11 bg-zinc-500 text-zinc-900"
        >
          <div
            class="datasheet__header--stats-single-box w-9 h-9 bg-slate-200 grid place-items-center"
          >
            20 "
          </div>
        </div>
        <!-- end caja  -->
    </div>
    <div class="datasheet-desktop--grid-container grid grid-cols-3 border-t-0 border-r-2 border-b-2 border-l-2 border-solid border-slate-700 mx-2">
      <div class="datasheet-desktop__grid-container--left col-span-2">
        <div
          class="datasheet-desktop__section-header bg-slate-400 m-3 grid grid-cols-2"
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

        <div class="datasheet-desktop__section-header bg-slate-400 m-3">
          <p>Melee weapons</p>
        </div>

        <div class="datasheet-desktop__section-header bg-slate-400 m-3">
          <p>Wargear Options</p>
        </div>
      </div>
      <div class="datasheet-desktop__grid-container--right border-l-2  border-slate-700">
        <div class="datasheet-desktop__section-header bg-slate-400 m-3 ">
          <p>Abilities</p>
        </div>
        <div class="datasheet-desktop__section-header bg-slate-400 m-3">
          <p>Unit Composition</p>
        </div>
        <div class="datasheet-desktop__section-header bg-slate-400 m-3">
          <p>Leader</p>
        </div>
      </div>
    </div>

    <div class="keywords-container">


    </div>


  </div>
</template>
<script>
export default {};
</script>
<style scoped>
div p {
  border: 1px solid red;
}

.datasheet-desktop__container {
  width: 1200px;
}

.datasheet-desktop__header {
  height: 200px;
}

.color-stripe {
  clip-path: polygon(
    0% 0%,
    100% 0%,
    100% 43.00%,
    49.06% 43.00%,
    47.3% 44.0%,
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
