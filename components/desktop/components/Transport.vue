<template>
    <div
          class="datasheet-desktop__section-header"
        >
        <div class="datasheet-desktop__section-header  bg-zinc-900 text-zinc-100 rounded-t-lg p-3 m-3">
          <p>Transport</p>
        </div>
        <div class="abilities-container p-3 mb-2">
       <p>{{ transport }}</p>
        </div>
      </div>
</template>

<script setup>

const props = defineProps({
  transport: String
});
</script>
