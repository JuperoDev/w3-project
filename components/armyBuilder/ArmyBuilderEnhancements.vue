<template>
    <v-dialog v-model="isEnhancementDialogOpen" max-width="300">
      <v-card>
        <v-card-title class="text-h6">Enhancement</v-card-title>
        <v-card-text>Enhancement details for {{ unit.unitName }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="isEnhancementDialogOpen = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  
  const props = defineProps({
    unit: Object,
    isOpen: Boolean,
  });
  
  const isEnhancementDialogOpen = ref(props.isOpen);
  
  watch(() => props.isOpen, (newVal) => {
    isEnhancementDialogOpen.value = newVal;
  });
  </script>
  