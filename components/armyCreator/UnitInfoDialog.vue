<template>
    <div>
      <v-btn icon small @click="openDialog">
        <v-icon small>mdi-information</v-icon>
      </v-btn>
      <v-dialog v-model="dialog" max-width="500px" @open="fetchJsonData">
        <v-card>
          <v-card-title class="headline">Unit Info</v-card-title>
          <v-card-text>
            <pre v-if="jsonData" class="json-display">{{ formattedJson }}</pre>
            <p v-else>Loading...</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  const props = defineProps({
    url: {
      type: String,
      required: true
    }
  });
  
  const dialog = ref(false);
  const jsonData = ref(null);
  
  const fetchJsonData = async () => {
    jsonData.value = null; // Reset previous data
    try {
      const response = await fetch(props.url);
      if (response.ok) {
        jsonData.value = await response.json();
      } else {
        jsonData.value = { error: 'Failed to load data' };
      }
    } catch (error) {
      jsonData.value = { error: error.message };
    }
  };
  
  const openDialog = () => {
    dialog.value = true;
    fetchJsonData();
  };
  
  const formattedJson = computed(() => {
    return JSON.stringify(jsonData.value, null, 2);
  });
  </script>
  
  <style scoped>
  .json-display {
    background-color: #2e2e2e;
    color: white;
    padding: 10px;
    white-space: pre-wrap; /* To preserve formatting */
  }
  </style>
  