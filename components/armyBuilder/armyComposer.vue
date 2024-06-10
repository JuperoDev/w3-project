<template>
    <div class="armyComposer_container">
      <div class="armyComposer_container_character bg-zinc-800 text-zinc-50 uppercase">
        character 160 points
        <v-btn @click="openDialog">+</v-btn>
      </div>
  
      {{ url }}
      <p>Unit 1</p>
      <p>70</p>
  
      <v-dialog v-model="isDialogOpen" max-width="500">
        <template v-slot:default="{ isActive }">
          <v-card title="Dialog">
            <v-card-text>
              <div v-for="character in characters" :key="character.unitName">
                {{ character.unitName }}: {{ character.basicPoints }} points
              </div>
            </v-card-text>
  
            <v-card-actions>
              <v-spacer></v-spacer>
  
              <v-btn text="Close Dialog" @click="isDialogOpen = false"></v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  // props
  const props = defineProps({
    url: String
  });
  
  const isDialogOpen = ref(false);
  const characters = ref([]);
  
  const openDialog = () => {
    isDialogOpen.value = true;
  };
  
  // Import JSON data when the component is mounted

  </script>
  