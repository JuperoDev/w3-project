<template>
  <div>
    <span 
      class="text-sm text-blue-500 cursor-pointer hover:underline" 
      @click="openDialog"
    >
      Enhancements
    </span>
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          Enhancements
        </v-card-title>
        <v-card-text>
          <v-expansion-panels v-model="expandedPanel">
            <v-expansion-panel
              v-for="(enhancement, index) in enhancements"
              :key="index"
            >
              <v-expansion-panel-title :class="{'selected-title': isSelected(enhancement.name)}">
                {{ enhancement.name }} ({{ enhancement.points }} points)
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <p class="mb-4"><em>{{ enhancement.lore }}</em></p>
                <p v-html="enhancement.description" class="mb-4"></p>
                <v-radio
                  :label="`Select ${enhancement.name}`"
                  :value="enhancement.name"
                  v-model="selectedEnhancement"
                  @click="handleRadioClick(enhancement)"
                ></v-radio>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';

const dialog = ref(false);
const enhancements = ref([]);
const selectedEnhancement = ref('');
const expandedPanel = ref(null);

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
    selectedEnhancement.value = '';
    emits('update-enhancement', null); // Emit null for de-selection
  } else {
    selectedEnhancement.value = enhancement.name;
    emits('update-enhancement', enhancement);
  }
};

const isSelected = (name) => {
  return selectedEnhancement.value === name;
};

watch(() => props.enhancementUrl, fetchFileContent);
</script>

<style scoped>
.selected-title {
  background-color: #555; /* Dark greyish color */
  color: white; /*text color for better contrast */
}
</style>
