<template>
  <v-app>
    <v-app-bar app elevation="0">
      <v-toolbar-title>
        <div class="font-bebas flex items-center justify-center">
          <h2>Army Builder</h2>
        </div>
      </v-toolbar-title>

      <v-btn icon @click="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app right>
      <div class="right">
        <h3>Stored Armies</h3>
        <div v-if="!stepperVisible">
          <v-btn @click="showStepper(); closeDrawer();">
            Create New Army
          </v-btn>
        </div>
        <div v-for="(army, index) in armies" :key="index">
          <p><strong>Name:</strong> {{ army.name }}</p>
          <p><strong>Army:</strong> {{ army.selectedArmy }}</p>
          <p><strong>Point List:</strong> {{ army.pointList }}</p>
          <p><strong>Detachment:</strong> {{ army.selectedDetachment }}</p>
          <v-btn icon small @click="removeArmy(index)" class="btn-icon">
            <v-icon small>mdi-delete</v-icon>
          </v-btn>
          <v-btn icon small @click="viewArmy(index)" class="btn-icon">
            <v-icon small>mdi-arrow-right</v-icon>
          </v-btn>
        </div>
      </div>
    </v-navigation-drawer>
    <v-main>
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
                  <v-text-field
                    v-model="name"
                    hide-details="auto"
                    label="Name"
                  ></v-text-field>
                  <v-radio-group
                    v-model="pointList"
                    label="Army Size"
                    class="mt-8"
                  >
                    <v-radio label="1000 points" value="1000"></v-radio>
                    <v-radio label="2000 points" value="2000"></v-radio>
                    <v-radio label="3000 points" value="3000"></v-radio>
                  </v-radio-group>
                  <v-btn class="m-3" @click="createArmy">Create</v-btn>
                </v-card>
              </v-stepper-window-item>
            </v-stepper-window>
            <v-stepper-actions
              prev-text="Previous"
              next-text="Next"
              @click:next="customActionForNext"
              @click:prev="customActionForPrev"
            ></v-stepper-actions>
          </v-stepper>
        </div>
        <div>
          <ArmyCreatorArmyComposer 
            v-if="!stepperVisible && currentArmyIndex !== null"
            :name="name"
            :selectedArmy="selectedArmy"
            :pointList="pointList"
            :selectedDetachment="selectedDetachment"
            :url="armyUrl"
            :armyIndex="currentArmyIndex"
          />
        </div>
      </div>
    </v-main>
    <GeneralPurposeFloatingFooter />
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from "vue";
import { useArmyStorage } from "@/stores/armyStorage";
import factionsData from "./faction.json";
import armiesData from "./army.json";
import detachmentsData from "./detachment.json";
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
const drawer = ref(false);

const selectedFaction = ref(null);
const selectedArmy = ref(null);
const selectedDetachment = ref(null);
const currentArmy = reactive({ characters: [] });
const currentArmyIndex = ref(null);

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
    return detachments
      ? detachments.map((detachment) => detachment.toLowerCase())
      : [];
  }
  return [];
});

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

const armyStore = useArmyStorage();
const armies = computed(() => armyStore.armies);

onMounted(() => {
  armyStore.initializeStore();
  stepperVisible.value = armies.value.length === 0;
  drawer.value = true;
});

const closeDrawer = () => {
  drawer.value = false;
};

const createArmy = () => {
  if (
    name.value &&
    selectedArmy.value &&
    pointList.value &&
    selectedDetachment.value
  ) {
    const newArmy = {
      name: name.value,
      selectedFaction: selectedFaction.value,
      selectedArmy: selectedArmy.value,
      pointList: pointList.value,
      selectedDetachment: selectedDetachment.value,
      characters: [],
      battlelineUnits: [], // Ensure battlelineUnits is initialized
    };
    armyStore.addArmy(newArmy);

    stepperVisible.value = false;
    currentArmyIndex.value = armies.value.length - 1;

    drawer.value = false;
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
  currentArmy.characters = [...army.characters];
  currentArmyIndex.value = index;

  step.value = 0;
};

const viewArmy = (index) => {
  loadArmy(index);
  toggleDrawer();
  stepperVisible.value = false;
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
  stepperVisible.value = true;
};

const toggleDrawer = () => {
  drawer.value = !drawer.value;
  if (!drawer.value) {
    stepperVisible.value = false;
  }
};

const armyUrl = computed(() => {
  if (selectedFaction.value && selectedArmy.value) {
    return `/faction/${selectedFaction.value.toLowerCase()}/${selectedArmy.value.toLowerCase()}/collection.json`;
  }
  return '';
});
</script>

<style scoped>
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

.btn-icon {
  border: none;
  box-shadow: none;
  background-color: transparent;
  padding: 0;
  min-width: 0;
}

.btn-icon:hover {
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
}

.v-btn--icon .v-icon {
  font-size: 20px; /* Smaller icon size */
}

h2 {
  font-size: 30px;
  font-weight: 500;
  color: #191919;
  margin-left: 30px;
  text-transform: uppercase;
}
</style>
