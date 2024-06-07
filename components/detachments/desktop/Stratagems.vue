<template>
  <div class="m-3 px-2 md:px-15">
    <h3 class="text-2xl font-bebas mt-5 px-13 ">Stratagems</h3>

    <div class="grid grid-cols-1 md:grid-cols-2 md:gap-4">
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
