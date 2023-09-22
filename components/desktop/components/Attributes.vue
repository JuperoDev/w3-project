<template>
  <div>
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
