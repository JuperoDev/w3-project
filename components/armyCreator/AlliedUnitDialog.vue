<template>
  <div>
    <!-- Button to open the dialog -->
    <button @click="openDialog" class="border-solid border-1 border-white bg-zinc-800 hover:bg-zinc-950 text-white font-bold py-1 px-2 rounded my-2 text-sm">
      +
    </button>

    <!-- Dialog to show the units -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title class="d-flex justify-space-between align-center">
          <span class="text-h5">{{ title }}</span>
          <button @click="closeDialog" class="plain-button">&times;</button>
        </v-card-title>
        <v-card-text>
          <!-- Loop through each allied army group -->
          <div v-for="armyGroup in unitsByArmy" :key="armyGroup.armyName" class="mb-4">
            <!-- Display the army name -->
            <h4 class="text-md font-semibold mt-2">{{ armyGroup.armyName }}</h4>
            <!-- Display the sanitized URL -->
            <p class="text-sm text-gray-500">{{ generateUrl(armyGroup.armyName) }}</p>
            <!-- Loop through each unit in the army -->
            <div v-for="unit in armyGroup.units" :key="unit.unitName" class="mb-2">
              <p><strong>{{ unit.unitName }}:</strong> {{ unit.basicPoints }} points</p>
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
  }
});

const dialog = ref(false);

// Group units by their alliedArmyName
const unitsByArmy = computed(() => {
  const grouped = [];
  props.units.forEach(unit => {
    const armyGroup = grouped.find(group => group.armyName === unit.alliedArmyName);
    if (armyGroup) {
      armyGroup.units.push(unit);
    } else {
      grouped.push({ armyName: unit.alliedArmyName, units: [unit] });
    }
  });
  return grouped;
});

// Sanitize the name to generate a valid URL
const sanitizeName = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")  // Replace non-alphanumeric characters with hyphens
    .replace(/^-+|-+$/g, "");      // Remove leading and trailing hyphens
};

// Generate the URL based on the sanitized army name
const generateUrl = (armyName) => {
  const sanitizedArmyName = sanitizeName(armyName);
  return `/faction/${sanitizedArmyName}`;
};

const openDialog = () => {
  dialog.value = true;
};

const closeDialog = () => {
  dialog.value = false;
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
.text-sm {
  font-size: 0.875rem;
}
.text-gray-500 {
  color: #6b7280;
}
</style>
