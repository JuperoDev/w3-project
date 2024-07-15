<template>
  <v-dialog v-model="dialog" max-width="500px">
    <template v-slot:activator="{ props }">
      <v-btn small v-bind="props">Unit Options</v-btn>
    </template>
    <v-card>
      <v-card-title>Unit Options for {{ unitName }}</v-card-title>
      <v-card-text>
        <v-radio-group v-model="selectedOption" mandatory>
          <v-radio
            v-for="(option, index) in unitOptions"
            :key="index"
            :label="getOptionLabel(option)"
            :value="index"
          ></v-radio>
        </v-radio-group>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
        <v-btn color="blue darken-1" text @click="saveOptions">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';

const props = defineProps({
  unitName: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  currentOption: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(['update-unit-option']);

const dialog = ref(false);
const unitData = ref(null);
const selectedOption = ref(0);

const fetchUnitData = async () => {
  try {
    const response = await fetch(props.url);
    unitData.value = await response.json();
    // Set the initial selected option based on the current option
    if (props.currentOption.points) {
      const index = unitOptions.value.findIndex(option => option.points === props.currentOption.points);
      if (index !== -1) {
        selectedOption.value = index;
      }
    }
  } catch (error) {
    console.error('Error fetching unit data:', error);
  }
};

const unitOptions = computed(() => unitData.value?.options || []);
const unitComposition = computed(() => unitData.value?.unitComposition || []);

const getOptionLabel = (option) => {
  const composition = option.count.map((count, index) => {
    const unit = unitComposition.value[index];
    return `${count} ${unit.unitType}${count > 1 ? 's' : ''}`;
  }).join(', ');
  return `${composition} (${option.points} points)`;
};

const saveOptions = () => {
  const selectedUnitOption = unitOptions.value[selectedOption.value];
  emit('update-unit-option', {
    composition: selectedUnitOption.count.map((count, index) => ({
      unitType: unitComposition.value[index].unitType,
      quantity: count
    })),
    points: parseInt(selectedUnitOption.points) || 0
  });
  dialog.value = false;
};

onMounted(fetchUnitData);

watch(() => props.url, fetchUnitData);
</script>