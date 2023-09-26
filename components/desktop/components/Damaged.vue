<template>
    <div
          class="datasheet-desktop__section-header"
        >
        <div class="datasheet-desktop__section-header bg-slate-400 m-3">
          <p>Damaged: 1 - {{ damaged.remainingWounds }} wounds remaining </p>
        </div>
        <div class="px-5 py-2">

      <p>{{ damaged.description }}</p>

    </div>
      </div>
</template>

<script setup>

const props = defineProps({
  damaged: Object
});
</script>
