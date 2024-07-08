<template>
  <div>
    <v-btn @click="openDialog">Enhancements</v-btn>
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          Enhancements
        </v-card-title>
        <v-card-text>
          <p>Here you can add enhancement options for the character.</p>
          <p>Generated Route: {{ enhancementUrl }}</p> <!-- Display the generated route -->
          <v-radio-group v-model="selectedEnhancement">
            <v-radio
              v-for="(enhancement, index) in enhancements"
              :key="index"
              :label="`${enhancement.name} (${enhancement.points} points)`"
              :value="enhancement.name"
              @click="handleRadioClick(enhancement.name)"
            ></v-radio>
          </v-radio-group>
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
import { ref, watch } from 'vue';

const dialog = ref(false);
const enhancements = ref([]);
const selectedEnhancement = ref('');

const props = defineProps({
  enhancementUrl: {
    type: String,
    required: true
  }
});

const openDialog = () => {
  dialog.value = true;
  fetchFileContent();
};

const fetchFileContent = async () => {
  try {
    const response = await fetch(props.enhancementUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    enhancements.value = data.enhacements || [];
  } catch (error) {
    console.error('Error fetching file content:', error);
    enhancements.value = [];
  }
};

const handleRadioClick = (value) => {
  if (selectedEnhancement.value === value) {
    selectedEnhancement.value = null;
  }
};

watch(() => props.enhancementUrl, fetchFileContent);
</script>

<style scoped>
</style>
