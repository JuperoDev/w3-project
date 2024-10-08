<template>
  <div>
    <button @click="openDialog" class="unitdialog__add-plus-button border-solid border-1 border-white bg-zinc-800 hover:bg-zinc-950 text-white font-bold py-1 px-2 rounded my-2 text-sm">
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
          <!-- List of units -->
          <div v-for="unit in filteredUnits" :key="unit.unitName" class="mb-2 grid grid-cols-4  border-b-2 pb-4">
            <div class="col-left col-span-3 pr-2"><p><strong>{{ unit.unitName }} <br/></strong> {{ unit.basicPoints }} points</p>
              <p>Count in army: {{ unitCounts[unit.unitName] || 0 }}</p></div>

              
            <div class="col-right flex flex-row-reverse">
              
              <!-- <v-btn small @click="() => addUnit(unit)" class="mb-2 ">Add</v-btn> -->
            <div class="py-5">
              <button @click="() => addUnit(unit)" class="unitdialog__add-plus-button border-solid border-1 border-white bg-zinc-800 hover:bg-zinc-950 text-white font-bold py-1 px-2 rounded   mr-3 text-sm">
      +
    </button>
  </div>
            
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

// Function to sanitize detachment names
const sanitizeDetachmentName = (name) => {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
};

// Filter units based on the search query and detachment filters
const filteredUnits = computed(() => {
  const sanitizedDetachment = sanitizeDetachmentName(props.selectedDetachment);

  return props.units.filter(unit => {
    const showInDetachment = unit.showInDetachment ? unit.showInDetachment.split(',') : [];
    const hideInDetachment = unit.hideInDetachment ? unit.hideInDetachment.split(',') : [];

    // Check if the unit should be shown based on showInDetachment and hideInDetachment fields
    const isShown = (showInDetachment.length === 0 || showInDetachment.includes(sanitizedDetachment))
      && !hideInDetachment.includes(sanitizedDetachment);

    // Filter by search query
    return isShown && (!search.value || unit.unitName.toLowerCase().includes(search.value.toLowerCase()));
  });
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
