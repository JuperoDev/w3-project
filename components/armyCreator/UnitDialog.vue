<template>
    <div>
      <button @click="openDialog" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Add Unit
      </button>
      <v-dialog v-model="dialog" max-width="600px">
        <v-card>
          <v-card-title>
            <span class="text-h5">{{ title }}</span>
            <v-spacer></v-spacer>
            <v-btn icon @click="closeDialog">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-text-field v-model="search" label="Search" class="mb-4"></v-text-field>
            <div v-for="unit in filteredUnits" :key="unit.unitName" class="mb-2">
              <p><strong>{{ unit.unitName }}:</strong> {{ unit.basicPoints }} points</p>
              <p>Count in army: 0</p>
              <v-btn small @click="() => addUnit(unit)" class="mb-2">Add</v-btn>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="closeDialog">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  const props = defineProps({
    title: {
      type: String,
      required: true
    },
    units: {
      type: Array,
      required: true
    }
  });
  
  const emit = defineEmits(['close', 'add-unit']);
  
  const dialog = ref(false);
  const search = ref('');
  
  const filteredUnits = computed(() => {
    if (!search.value) return props.units;
    return props.units.filter(unit =>
      unit.unitName.toLowerCase().includes(search.value.toLowerCase())
    );
  });
  
  const openDialog = () => {
    dialog.value = true;
  };
  
  const closeDialog = () => {
    dialog.value = false;
    emit('close');
  };
  
  const generateUniqueId = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };
  
  const addUnit = (unit) => {
    const unitWithId = {
      ...unit,
      id: generateUniqueId(),
      type: props.title.replace('Select ', '')
    };
    emit('add-unit', unitWithId);
  };
  </script>
  
 
  