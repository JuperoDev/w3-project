<template>
    <div>
      <v-btn @click="dialog = true">Enhancements</v-btn>
      <v-dialog v-model="dialog" max-width="600px">
        <v-card>
          <v-card-title>
            Enhancements
          </v-card-title>
          <v-card-text>
            <!-- Add your enhancement options or content here -->
            <p>Here you can add enhancement options for the character.</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="dialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const dialog = ref(false);
  </script>
  
  <style scoped>
  </style>
  