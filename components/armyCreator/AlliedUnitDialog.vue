<template>

    <div>
      <button @click="openDialog" class="border-solid border-1 border-white bg-zinc-800 hover:bg-zinc-950 text-white font-bold py-1 px-2 rounded my-2 text-sm">
        +
      </button>
      <v-dialog v-model="dialog" max-width="600px">
        <v-card>
          <div class="sticky-header">
            <v-card-title class="d-flex justify-space-between align-center">
              <span class="text-h5" style="margin-top: 20px;">{{ title }}</span>
              <v-spacer></v-spacer>
              <button @click="closeDialog" class="plain-button">
                &times;
              </button>
            </v-card-title>
            <div class="sticky-search">
              <v-text-field v-model="search" label="Search" class="centered-search"></v-text-field>
            </div>
          </div>
          <v-card-text>
            <!-- Iterate through the grouped units by alliedArmy -->
            <div v-for="(units, army) in groupedUnits" :key="army" class="mb-4">
              <!-- Group Title -->
              <h3 class="text-lg font-semibold mb-2 uppercase bg-zinc-900 text-zinc-50 p-3 rounded-lg">{{ army }}</h3>
              <!-- Units in the group -->
              <div v-for="unit in units" :key="unit.unitName" class="mb-2">
                <p><strong>{{ unit.unitName }}:</strong> {{ unit.basicPoints }} points</p>
                <p>Count in army: {{ unitCounts[unit.unitName] || 0 }}</p>
                <v-btn small @click="() => addUnit(unit)" class="mb-2">Add</v-btn>
              </div>
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
    },
    unitCounts: {
      type: Object,
      default: () => ({})
    },
    selectedDetachment: {
      type: String,
      required: true
    }
  });
  
  const emit = defineEmits(['close', 'add-unit']);
  
  const dialog = ref(false);
  const search = ref('');
  
  // Group the filtered units by their alliedArmy tag
  const groupedUnits = computed(() => {
    const grouped = {};
  
    props.units.forEach(unit => {
      if (unit.alliedArmy) {  // Only include units with an alliedArmy field
        const army = unit.alliedArmy;
        if (!grouped[army]) {
          grouped[army] = [];
        }
  
        // Filter by search query
        if (!search.value || unit.unitName.toLowerCase().includes(search.value.toLowerCase())) {
          grouped[army].push(unit);
        }
      }
    });
  
    return grouped;
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
  
  <style scoped>
  .plain-button {
    border: none;
    background: none;
    color: black;
    font-size: 24px;
    cursor: pointer;
  }
  .plain-button:hover {
    color: grey;
  }
  
  .sticky-header {
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 2;
    padding-top: 10px; /* Adjust padding for when it gets sticky */
    padding-bottom: 10px;
  }
  
  .sticky-search {
    background-color: white;
    z-index: 1;
  }
  
  .centered-search {
    width: 95%; 
    margin: 0 auto; /* Center div */
  }
  </style>
  
