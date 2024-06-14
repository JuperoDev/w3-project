<template>
  <div class="grid grid-cols-2">
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
        
        <ArmyBuilderArmyComposer :url="factionAndArmyUrl" @add-character="addCharacterToCurrentArmy" />
        
        <div class="characters-list">
          <h3>Characters in Current Army:</h3>
          <div v-for="(character, charIndex) in currentArmy.characters" :key="charIndex">
            <p>{{ character.unitName }}: {{ character.basicPoints }} points</p>
            <v-btn @click="removeCharacter(charIndex)">Delete</v-btn>
            <div v-if="character.unitComposition" class="unit-composition-list">
              <div v-for="unit in character.unitComposition" :key="unit.unitType" class="unit-composition">
                <ArmyBuilderAdditionalData :url="factionAndArmyUrl" :unit="unit" />
                <ArmyBuilderWarGearData :url="factionAndArmyUrl" :unit="unit" :parentUnit="unit.parentUnit" @updateWargear="updateWargear(charIndex, $event)" />
                <div>{{ unit.minQuantity }} x {{ unit.unitType }}:</div>
                <div v-for="equipment in unit.equipment" :key="equipment" class="equipment">
                  - {{ equipment }}
                </div>
                <div v-if="unit.selectedWargear && unit.selectedWargear.length" class="selected-wargear">
                  <div v-for="gear in unit.selectedWargear" :key="gear.item">
                    {{ gear.item }} x{{ gear.amount }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <v-btn class="m-3" @click="saveCurrentArmy">Save Army</v-btn>
      </div>
      <div v-if="!stepperVisible">
        <v-btn @click="showStepper">Create New Army</v-btn>
      </div>
    </div>
    <div class="right">
      <h2>Stored Armies</h2>
      <div v-for="(army, index) in armies" :key="index">
        <p><strong>Name:</strong> {{ army.name }}</p>
        <p><strong>Army:</strong> {{ army.selectedArmy }}</p>
        <p><strong>Point List:</strong> {{ army.pointList }}</p>
        <p><strong>Detachment:</strong> {{ army.selectedDetachment }}</p>
        <v-btn @click="removeArmy(index)">Delete</v-btn>
        <v-btn @click="loadArmy(index)">Go to Army</v-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from "vue";
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

const selectedFaction = ref(null);
const selectedArmy = ref(null);
const selectedDetachment = ref(null);
const currentArmy = reactive({ characters: [] });

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

const showArmyComposer = () => {
  if (name.value && selectedArmy.value && pointList.value) {
    armyComposerVisible.value = true;
  } else {
    armyComposerVisible.value = false;
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
  currentArmy.characters = [];
  nextTick(() => {
    currentArmy.characters = [...army.characters];
  });
  step.value = 0;
  armyComposerVisible.value = true; // Ensure the composer is visible
  console.log("Loaded army:", army);
};

const showStepper = () => {
  name.value = "";
  selectedFaction.value = null;
  selectedArmy.value = null;
  pointList.value = "";
  selectedDetachment.value = null;
  currentArmy.characters = [];
  step.value = 0;
  armyComposerVisible.value = false;
  stepperVisible.value = true;
};

const addCharacterToCurrentArmy = (character) => {
  const currentIndex = armies.value.findIndex(army => army.name === name.value);
  if (currentIndex !== -1) {
    console.log(`Adding character to army at index ${currentIndex}:`, character);
    const existingCharacterIndex = currentArmy.characters.findIndex(c => c.unitName === character.unitName && c.basicPoints === character.basicPoints);
    if (existingCharacterIndex === -1) {
      currentArmy.characters.push(character); // Update current army in the UI
      armyStore.addCharacterToArmy(currentIndex, character); // Ensure this method exists in your store
      console.log("Current state of armies after adding character:", JSON.stringify(armyStore.armies, null, 2));
      nextTick(() => {
        currentArmy.characters = [...armyStore.armies[currentIndex].characters];
      });
    } else {
      console.log("Character already exists in the current army.");
    }
  }
};

const saveCurrentArmy = () => {
  const currentIndex = armies.value.findIndex(army => army.name === name.value);
  if (currentIndex !== -1) {
    armyStore.armies[currentIndex] = JSON.parse(JSON.stringify(currentArmy)); // Update the store with the current army
    armyStore.saveArmies(); // Explicitly save the current state to local storage
    console.log("Saved Armies:", JSON.stringify(armyStore.armies, null, 2)); // Log the current state of armies
  }
};

const removeCharacter = (charIndex) => {
  currentArmy.characters.splice(charIndex, 1); // Update current army in the UI
  saveCurrentArmy(); // Save changes after removing character
  nextTick(() => {
    currentArmy.characters = [...currentArmy.characters];
  });
};

const updateWargear = (charIndex, wargear) => {
  currentArmy.characters[charIndex].unitComposition.forEach(unit => {
    unit.selectedWargear = wargear;
  });
  saveCurrentArmy(); // Save changes after updating wargear
  nextTick(() => {
    currentArmy.characters = [...currentArmy.characters];
  });
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
