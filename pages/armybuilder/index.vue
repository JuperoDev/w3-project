<template>
  <div class="main-container">
    <v-layout>
      <v-navigation-drawer v-model="drawer" temporary>
  

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <div class="right">
        <v-card class="pa-4 mb-4">
          <v-card-title>
            <h2>Stored Armies</h2>
          </v-card-title>
          <v-card-actions>
            <v-btn @click="showStepper" color="primary" class="ml-auto">
              Create New Army
            </v-btn>
          </v-card-actions>
        </v-card>

        <v-card
          v-for="(army, index) in armies"
          :key="index"
          class="mb-3"
          outlined
        >
          <v-card-title class="headline">{{ army.name }}</v-card-title>
          <v-card-subtitle>{{ army.selectedArmy }}</v-card-subtitle>
          <v-card-text>
            <p><strong>Point List:</strong> {{ army.pointList }}</p>
            <p><strong>Detachment:</strong> {{ army.selectedDetachment }}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="removeArmy(index)" color="error">
              Delete
            </v-btn>
            <v-btn @click="loadArmy(index)" color="primary">
              Go to Army
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </v-list>
  </v-navigation-drawer>
      <v-main>
        <div class="d-flex justify-center align-center h-10">
          <v-btn
            @click.stop="drawer = !drawer"
          >
            Toggle
          </v-btn>
        </div>
      </v-main>
    </v-layout>
  </div>
  <div class="grid grid-cols-1 lg:grid-cols-2">
    <div>
      <div v-if="stepperVisible" class="stepper-army-builder">
        <v-stepper v-model="step">
          <v-stepper-header>
            <v-stepper-item title="" value="1"></v-stepper-item>
            <v-divider></v-divider>
            <v-stepper-item title="" value="2"></v-stepper-item>
            <v-divider></v-divider>
            <v-stepper-item title="" value="3"></v-stepper-item>
            <v-divider></v-divider>
            <v-stepper-item title="" value="4"></v-stepper-item>
          </v-stepper-header>
          <v-stepper-window>
            <v-stepper-window-item value="1">
              <v-card title="Choose Faction" flat>
                <v-radio-group v-model="selectedFaction">
                  <v-radio v-for="(faction, index) in factions" :key="index" :label="faction" :value="faction"></v-radio>
                </v-radio-group>
              </v-card>
            </v-stepper-window-item>
            <v-stepper-window-item value="2">
              <v-card title="Choose Army" flat>
                <v-radio-group v-model="selectedArmy">
                  <v-radio v-for="(army, index) in filteredArmies" :key="index" :label="army" :value="army"></v-radio>
                </v-radio-group>
              </v-card>
            </v-stepper-window-item>
            <v-stepper-window-item value="3">
              <v-card title="Choose Detachment" flat>
                <v-radio-group v-model="selectedDetachment">
                  <v-radio v-for="(detachment, index) in filteredDetachments" :key="index" :label="detachment" :value="detachment"></v-radio>
                </v-radio-group>
              </v-card>
            </v-stepper-window-item>
            <v-stepper-window-item value="4">
              <v-card title="Details" flat>
                <v-text-field v-model="name" hide-details="auto" label="Name"></v-text-field>
                <v-radio-group v-model="pointList" label="Army Size" class="mt-8">
                  <v-radio label="1000 points" value="1000"></v-radio>
                  <v-radio label="2000 points" value="2000"></v-radio>
                  <v-radio label="3000 points" value="3000"></v-radio>
                </v-radio-group>
                <v-btn class="m-3" @click="createArmy">Create</v-btn>
              </v-card>
            </v-stepper-window-item>
          </v-stepper-window>
          <v-stepper-actions prev-text="Previous" next-text="Next" @click:next="customActionForNext" @click:prev="customActionForPrev"></v-stepper-actions>
        </v-stepper>
      </div>
      <div v-if="armyComposerVisible">
        <h2>Selected Options:</h2>
        <p><strong>Name:</strong> {{ name }}</p>
        <p><strong>Army:</strong> {{ selectedArmy }}</p>
        <p><strong>Point List:</strong> {{ pointList }}</p>
        <p><strong>Detachment:</strong> {{ selectedDetachment }}</p>
        <p><strong>URL to pass to Army Composer:</strong> {{ factionAndArmyUrl }}</p>
        <div class="armyBuilder_armyComponerContainer m-5">
        <ArmyBuilderArmyComposer ref="armyComposerRef" :url="factionAndArmyUrl" :armyIndex="currentArmyIndex" /> </div> 
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, computed, onMounted, reactive, nextTick } from "vue";
import { useArmyStore } from "@/stores/armyStore";
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
const drawer = ref(null);

const selectedFaction = ref(null);
const selectedArmy = ref(null);
const selectedDetachment = ref(null);
const currentArmy = reactive({ characters: [] });
const currentArmyIndex = ref(null);

const armyComposerRef = ref(null);  // Correctly define the ref

import factionsData from "./faction.json";
import armiesData from "./army.json";
import detachmentsData from "./detachment.json";

const factions = ref(factionsData.faction);

const filteredArmies = computed(() => {
  if (selectedFaction.value && armiesData[selectedFaction.value]) {
    const selectedFactionLower = selectedFaction.value.toLowerCase();
    const armies = armiesData[selectedFactionLower];
    return armies ? armies.map((army) => army.toLowerCase()) : [];
  }
  return [];
});

const filteredDetachments = computed(() => {
  if (selectedArmy.value && detachmentsData[selectedArmy.value]) {
    const selectedArmyLower = selectedArmy.value.toLowerCase();
    const detachments = detachmentsData[selectedArmyLower];
    return detachments ? detachments.map((detachment) => detachment.toLowerCase()) : [];
  }
  return [];
});

const sanitize = (str) => {
  return str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '-');
};

const factionAndArmyUrl = computed(() => {
  if (selectedFaction.value && selectedArmy.value) {
    const sanitizedFaction = sanitize(selectedFaction.value);
    const sanitizedArmy = sanitize(selectedArmy.value);
    return `${sanitizedFaction}/${sanitizedArmy}`;
  }
  return null;
});

const armyComposerVisible = ref(false);
const stepperVisible = ref(false);

const customActionForPrev = () => {
  step.value--;
};

const customActionForNext = () => {
  if (
    (step.value === 0 && !!selectedFaction.value) ||
    (step.value === 1 && !!selectedArmy.value) ||
    (step.value === 2 && !!selectedDetachment.value)
  ) {
    step.value++;
  }
};

const armyStore = useArmyStore();
const armies = computed(() => armyStore.armies);

onMounted(() => {
  armyStore.initializeStore();
  stepperVisible.value = armies.value.length === 0;
  console.log("Loaded armies on mount:", armies.value);
});

const createArmy = () => {
  if (name.value && selectedArmy.value && pointList.value && selectedDetachment.value) {
    const newArmy = {
      name: name.value,
      selectedFaction: selectedFaction.value,
      selectedArmy: selectedArmy.value,
      pointList: pointList.value,
      selectedDetachment: selectedDetachment.value,
      characters: [],
    };
    armyStore.addArmy(newArmy);
    armyComposerVisible.value = true;
    stepperVisible.value = false;
    currentArmyIndex.value = armies.value.length - 1;
  }
};

const removeArmy = (index) => {
  armyStore.removeArmy(index);
  stepperVisible.value = armyStore.armies.length === 0;
};

const loadArmy = (index) => {
  const army = armies.value[index];
  name.value = army.name;
  selectedFaction.value = army.selectedFaction;
  selectedArmy.value = army.selectedArmy;
  pointList.value = army.pointList;
  selectedDetachment.value = army.selectedDetachment;
  currentArmy.characters = [...army.characters];
  currentArmyIndex.value = index;

  nextTick(() => {
    armyComposerVisible.value = true;
    if (armyComposerRef.value) {
      armyComposerRef.value.loadCharacters(currentArmy.characters);
    }

    // Simulate the second click by calling the loadArmy method again. Im sorry I use such a cheap hack :(
    nextTick(() => {
      armyComposerVisible.value = true;
      if (armyComposerRef.value) {
        armyComposerRef.value.loadCharacters(currentArmy.characters);
      }
    });
  });

  step.value = 0;
  console.log("Loaded army:", army);
};

const showStepper = () => {
  name.value = "";
  selectedFaction.value = null;
  selectedArmy.value = null;
  pointList.value = "";
  selectedDetachment.value = null;
  currentArmy.characters = [];
  currentArmyIndex.value = null;
  step.value = 0;
  armyComposerVisible.value = false;
  stepperVisible.value = true;
};

const updateWargear = (charIndex, wargear) => {
  currentArmy.characters[charIndex].unitComposition.forEach(unit => {
    unit.selectedWargear = wargear;
  });
  const currentIndex = armies.value.findIndex(army => army.name === name.value);
  if (currentIndex !== -1) {
    armyStore.armies[currentIndex].characters = [...currentArmy.characters];
    armyStore.saveArmies(); // Explicitly save the current state to local storage
    console.log("Current state of armies after updating wargear:", JSON.stringify(armyStore.armies, null, 2)); // Log the current state of armies
    nextTick(() => {
      currentArmy.characters = [];
      currentArmy.characters = [...armyStore.armies[currentIndex].characters];
    });
  }
};
</script>

<style>
.characters-list {
  margin-top: 20px;
}

.unit-composition-list {
  margin-top: 10px;
  padding-left: 15px;
}

.unit-composition {
  font-size: 0.875rem;
  color: #555;
  margin-top: 5px;
}

.equipment {
  font-size: 0.875rem;
  color: #555;
  margin-left: 10px;
}

.selected-wargear {
  margin-top: 10px;
  font-size: 0.875rem;
  color: #000;
}
</style>
