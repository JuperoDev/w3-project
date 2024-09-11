<template>
    <div class="flex items-center">
      <input 
        v-model="newName" 
        class="border border-gray-300 rounded px-2 py-1 mr-2"
        placeholder="Enter new name"
      />
      <v-icon class="cursor-pointer mr-2 text-green-500" @click="saveName">mdi-check</v-icon>
      <v-icon class="cursor-pointer text-red-500" @click="cancelEdit">mdi-close</v-icon>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const props = defineProps({
    currentName: String,
  });
  
  const newName = ref(props.currentName);
  
  const emit = defineEmits(['save', 'cancel']);
  
  const saveName = () => {
    emit('save', newName.value);
  };
  
  const cancelEdit = () => {
    emit('cancel');
  };
  </script>
  
