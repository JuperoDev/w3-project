<template>
  <div class ="attributes-desktop-container -mt-8 grid grid-cols-3">
    <!-- boxes -->
    <div class="datasheet__header--stats grid grid-cols-6 place-items-center text-zinc-100 font-semibold ">
      <!-- Single Box -->
      <div class="datasheet__header--stats-single grid place-items-center z-50">
        <p>M</p>
        <div
          class="datasheet__header--stats-single-box p-1 w-11 h-11 bg-zinc-500 text-zinc-900"
        >
          <div
            class="datasheet__header--stats-single-box w-9 h-9 bg-slate-200 grid place-items-center"
          >
            8 "
          </div>
        </div>
      </div>
      <!-- end Single Box  -->

            <!-- Single Box -->
            <div class="datasheet__header--stats-single grid place-items-center z-50">
        T
        <div
          class="datasheet__header--stats-single-box p-1 w-11 h-11 bg-zinc-500 text-zinc-900"
        >
          <div
            class="datasheet__header--stats-single-box w-9 h-9 bg-slate-200 grid place-items-center"
          >
            4
          </div>
        </div>
      </div>
      <!-- end Single Box  -->

            <!-- Single Box -->
            <div class="datasheet__header--stats-single grid place-items-center z-50">
        SV
        <div
          class="datasheet__header--stats-single-box p-1 w-11 h-11 bg-zinc-500 text-zinc-900"
        >
          <div
            class="datasheet__header--stats-single-box w-9 h-9 bg-slate-200 grid place-items-center"
          >
            3+
          </div>
        </div>
      </div>
      <!-- end Single Box  -->

            <!-- Single Box -->
            <div class="datasheet__header--stats-single grid place-items-center z-50">
        W
        <div
          class="datasheet__header--stats-single-box p-1 w-11 h-11 bg-zinc-500 text-zinc-900"
        >
          <div
            class="datasheet__header--stats-single-box w-9 h-9 bg-slate-200 grid place-items-center"
          >
            6
          </div>
        </div>
      </div>
      <!-- end Single Box  -->

            <!-- Single Box -->
            <div class="datasheet__header--stats-single grid place-items-center z-50">
        LD
        <div
          class="datasheet__header--stats-single-box p-1 w-11 h-11 bg-zinc-500 text-zinc-900"
        >
          <div
            class="datasheet__header--stats-single-box w-9 h-9 bg-slate-200 grid place-items-center"
          >
            6 +
          </div>
        </div>
      </div>
      <!-- end Single Box  -->

            <!-- Single Box -->
            <div class="datasheet__header--stats-single grid place-items-center z-50">
        OC
        <div
          class="datasheet__header--stats-single-box p-1 w-11 h-11 bg-zinc-500 text-zinc-900"
        >
          <div
            class="datasheet__header--stats-single-box w-9 h-9 bg-slate-200 grid place-items-center"
          >
            1
          </div>
        </div>
      </div>
      <!-- end Single Box  -->
    </div>

    <!-- end boxes  -->

    <div class="attributes-desktop-container--right"></div>
  </div>
</template>

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
