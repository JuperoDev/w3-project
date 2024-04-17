<template>
  <div class="m-3">
    <h3 class="text-4xl mb-5">Stratagems</h3>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div v-for="stratagem in stratagems">
        <DetachmentsStrataCard :stratagem="stratagem" />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  stratagems: Array,
});
</script>
