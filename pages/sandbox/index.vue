<template>
  <div>
    <v-stepper v-model="step">
      <!-- Stepper Header -->
      <v-stepper-header>
        <v-stepper-item title="" value="1"></v-stepper-item>
        <v-divider></v-divider>
        <v-stepper-item title="" value="2"></v-stepper-item>
        <v-divider></v-divider>
        <v-stepper-item title="" value="3"></v-stepper-item>
        <v-divider></v-divider>
        <v-stepper-item title="" value="4"></v-stepper-item>
      </v-stepper-header>

      <!-- Stepper Windows -->
      <v-stepper-window>
        <v-stepper-window-item value="1">
          <v-card title="Choose Faction" flat>
            <!-- Faction selection -->
            <v-radio-group v-model="selectedFaction">
              <v-radio
                v-for="(faction, index) in factions"
                :key="index"
                :label="faction"
                :value="faction"
              ></v-radio>
            </v-radio-group>
          </v-card>
        </v-stepper-window-item>

        <v-stepper-window-item value="2">
          <v-card title="Choose Army" flat>
            <!-- Army selection -->
            <v-radio-group v-model="selectedArmy">
              <v-radio
                v-for="(army, index) in filteredArmies"
                :key="index"
                :label="army"
                :value="army"
              ></v-radio>
            </v-radio-group>
          </v-card>
        </v-stepper-window-item>

        <v-stepper-window-item value="3">
          <v-card title="Choose Detachment" flat>
            <!-- Detachment selection -->
            <v-radio-group v-model="selectedDetachment">
              <v-radio
                v-for="(detachment, index) in filteredDetachments"
                :key="index"
                :label="detachment"
                :value="detachment"
              ></v-radio>
            </v-radio-group>
          </v-card>
        </v-stepper-window-item>

        <v-stepper-window-item value="4">
          <v-card title="Details" flat>
            <!-- Details input -->
            <v-text-field v-model="name" hide-details="auto" label="Name"></v-text-field>
            <v-radio-group v-model="pointList" label="Army Size" class="mt-8">
              <v-radio label="1000 points" value="1000"></v-radio>
              <v-radio label="2000 points" value="2000"></v-radio>
              <v-radio label="3000 points" value="3000"></v-radio>
            </v-radio-group>
            <v-btn class="m-3" @click="showArmyComposer">Create</v-btn>
          </v-card>
        </v-stepper-window-item>
      </v-stepper-window>

      <!-- Stepper Actions -->
      <v-stepper-actions
        prev-text="Previous"
        next-text="Next"
        @click:next="customActionForNext"
        @click:prev="customActionForPrev"
      >
      </v-stepper-actions>
    </v-stepper>

    <!-- Display WHArmyList -->
    <div v-if="armyComposerVisible">
      <h2>Selected Options:</h2>
      <p><strong>Name:</strong> {{ name }}</p>
      <p><strong>Army:</strong> {{ selectedArmy }}</p>
      <p><strong>Point List:</strong> {{ pointList }}</p>
      <p><strong>Detachment:</strong> {{ selectedDetachment}}</p>
      <p><strong>URL to pass to Army Composer:</strong> {{ factionAndArmyUrl }}</p>
      <ArmyBuilderArmyComposer :url="factionAndArmyUrl" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import {
  VStepper,
  VStepperHeader,
  VStepperItem,
  VStepperActions,
  VStepperWindow,
  VStepperWindowItem,
} from "vuetify/labs/VStepper";

const step = ref(0);
const name = ref("");
const pointList = ref("");

// Import the JSON data
import factionsData from "./faction.json";
import armiesData from "./army.json";
import detachmentsData from "./detachment.json";

// Reactive variables
const selectedFaction = ref(null);
const selectedArmy = ref(null);
const selectedDetachment = ref(null);

// Extract factions from JSON data
const factions = ref(factionsData.faction);

// Computed property to filter armies based on the selected faction
const filteredArmies = computed(() => {
  if (selectedFaction.value && armiesData[selectedFaction.value]) {
    const selectedFactionLower = selectedFaction.value.toLowerCase();
    const armies = armiesData[selectedFactionLower];
    return armies ? armies.map((army) => army.toLowerCase()) : [];
  }
  return [];
});

// Computed property to filter detachments based on the selected army
const filteredDetachments = computed(() => {
  if (selectedArmy.value && detachmentsData[selectedArmy.value]) {
    const selectedArmyLower = selectedArmy.value.toLowerCase();
    const detachments = detachmentsData[selectedArmyLower];
    return detachments ? detachments.map((detachment) => detachment.toLowerCase()) : [];
  }
  return [];
});

// Function to sanitize URL parts
const sanitize = (str) => {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/[^a-z0-9-]/g, '-'); // Replace non-alphanumeric characters with hyphens
};

// Computed to generate URL
const factionAndArmyUrl = computed(() => {
  if (selectedFaction.value && selectedArmy.value) {
    const sanitizedFaction = sanitize(selectedFaction.value);
    const sanitizedArmy = sanitize(selectedArmy.value);
    return `${sanitizedFaction}/${sanitizedArmy}`;
  }
  return null;
});

const armyComposerVisible = ref(false);

// Custom function for previous action
const customActionForPrev = () => {
  step.value--;
};

// Custom function for next action
const customActionForNext = () => {
  if (
    (step.value === 0 && !!selectedFaction.value) ||
    (step.value === 1 && !!selectedArmy.value) ||
    (step.value === 2 && !!selectedDetachment.value)
  ) {
    step.value++;
  }
};

// Show the army composer only when all information is available
const showArmyComposer = () => {
  if (name.value && selectedArmy.value && pointList.value) {
    armyComposerVisible.value = true;
  } else {
    armyComposerVisible.value = false;
  }
};
</script>

<style>

</style>
