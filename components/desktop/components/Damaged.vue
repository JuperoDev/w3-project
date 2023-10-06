<template>
    <div
          class="datasheet-desktop__section-header"
        >
        <div class="datasheet-desktop__section-header  bg-zinc-900 text-zinc-100 rounded-t-lg p-3 m-3">
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
