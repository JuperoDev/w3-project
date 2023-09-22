<template>
  <div>
    <!-- boxes -->
    <div class="datasheet__header--stats grid grid-cols-6 place-items-center">
      <!-- Single Box -->
      <div class="datasheet__header--stats-single grid place-items-center">
        M
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
            <div class="datasheet__header--stats-single grid place-items-center">
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
            <div class="datasheet__header--stats-single grid place-items-center">
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
            <div class="datasheet__header--stats-single grid place-items-center">
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
            <div class="datasheet__header--stats-single grid place-items-center">
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
            <div class="datasheet__header--stats-single grid place-items-center">
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
