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
              @click="handleRadioClick(enhancement)"
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
  },
  initialSelectedEnhancement: {
    type: Object,
    default: null
  }
});

const emits = defineEmits(['update-enhancement']);

const openDialog = () => {
  dialog.value = true;
  selectedEnhancement.value = props.initialSelectedEnhancement ? props.initialSelectedEnhancement.name : '';
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

const handleRadioClick = (enhancement) => {
  if (selectedEnhancement.value === enhancement.name) {
    selectedEnhancement.value = null;
    emits('update-enhancement', null); // Emit null for de-selection
  } else {
    selectedEnhancement.value = enhancement.name;
    emits('update-enhancement', enhancement);
  }
};

// Optionally, you can watch the enhancementUrl prop and refetch if it changes
watch(() => props.enhancementUrl, fetchFileContent);
</script>

<style scoped>
</style>
