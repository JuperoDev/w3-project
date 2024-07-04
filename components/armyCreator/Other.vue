<template>
    <div class="bg-gray-800 p-4 rounded-lg shadow-md text-white">
      <div class="flex justify-between items-center">
        <h2 class="text-lg font-semibold">Other</h2>
        <button @click="openDialog" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Unit
        </button>
      </div>
      <p><strong>URL:</strong> {{ url }}</p>
  
      <UnitDialog :title="'Select Other Units'" :units="units" v-if="dialog" @close="closeDialog" />
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
  const dialog = ref(false); // Define the dialog ref
  
  const openDialog = () => {
    dialog.value = true;
  };
  
  const closeDialog = () => {
    dialog.value = false;
  };
  
  onMounted(() => {
    fetch(props.url)
      .then(response => response.json())
      .then(data => {
        units.value = data.other;
      });
  });
  </script>
  