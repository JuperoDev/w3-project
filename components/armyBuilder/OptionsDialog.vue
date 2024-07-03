<template>
    <v-dialog v-model="isOptionsDialogOpen" max-width="800" min-width="380" height="600">
      <template v-slot:default="{ isActive }">
        <v-card title="Unit Options">
          <v-card-text>
            <div v-for="option in unitOptions" :key="option.count[0]">
              <v-radio-group 
                :model-value="selectedOption" 
                :label="`Choose ${currentUnit.unitName} option`"
                @update:model-value="updateSelectedOption"
              >
                <v-radio
                  :label="`${option.count[0]} models for ${option.points} points`"
                  :value="option"
                ></v-radio>
              </v-radio-group>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text="Close" @click="closeDialog">Close</v-btn>
            <v-btn text="Save" @click="saveOption">Save</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  
  const props = defineProps({
    isOpen: Boolean,
    unitOptions: Array,
    currentUnit: Object,
    selectedOption: Object,
  });
  
  const emit = defineEmits(['update:isOpen', 'update:selectedOption', 'save-option']);
  
  const isOptionsDialogOpen = ref(props.isOpen);
  
  watch(() => props.isOpen, (newVal) => {
    isOptionsDialogOpen.value = newVal;
  });
  
  const closeDialog = () => {
    emit('update:isOpen', false);
  };
  
  const saveOption = () => {
    if (props.selectedOption) {
      emit('save-option', props.selectedOption);
    }
    closeDialog();
  };
  
  const updateSelectedOption = (value) => {
    emit('update:selectedOption', value);
  };
  </script>
  
  <style scoped>
  /* Add any styles specific to the dialog here */
  </style>
  