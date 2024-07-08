<template>
    <div>
      <v-btn icon small @click="dialog = true">
        <v-icon small>mdi-information</v-icon>
      </v-btn>
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title class="headline">Unit Info</v-card-title>
          <v-card-text>
            <p>{{ url }} {{ unitName }}</p>
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
  import { ref } from 'vue';
  
  const props = defineProps({
    url: {
      type: String,
      required: true
    },

    unitName: {
        type: String,
        required: true
    }
  });
  
  const dialog = ref(false);
  </script>
  