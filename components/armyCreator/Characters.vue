<template>
  <div class="bg-gray-800 p-4 rounded-lg shadow-md text-white">
    <div class="flex justify-between items-center">
      <h2 class="text-lg font-semibold">Characters</h2>
    </div>
    <p><strong>URL:</strong> {{ url }}</p>

    <UnitDialog :title="'Select Characters'" :units="units" @close="handleDialogClose" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import UnitDialog from './UnitDialog.vue';

const props = defineProps({
  url: {
    type: String,
    required: true
  }
});

const units = ref([]);

const handleDialogClose = () => {
  console.log('Dialog closed');
};

onMounted(() => {
  fetch(props.url)
    .then(response => response.json())
    .then(data => {
      units.value = data.characters;
    });
});
</script>
