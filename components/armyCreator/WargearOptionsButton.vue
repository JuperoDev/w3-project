<!-- WargearOptionsButton.vue -->
<template>
    <div>
      <v-btn icon small @click="dialog = true">
        <v-icon small>mdi-cog</v-icon>
        <!-- <span>Wargear Options</span> -->
      </v-btn>
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title class="headline">Wargear Options</v-card-title>
          <v-card-text>
            <!-- Add your wargear options form or information here -->
            <p>Select the wargear options for your unit.</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const dialog = ref(false);
  </script>
  
