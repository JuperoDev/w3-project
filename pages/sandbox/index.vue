<template>
    <div>


        <v-app>
    <v-container>
      <v-stepper v-model="step">
        <v-stepper-header>
          <v-stepper-item  title="" value="1"></v-stepper-item>

          <v-divider></v-divider>

          <v-stepper-item  title="" value="2"></v-stepper-item>

          <v-divider></v-divider>

          <v-stepper-item  title="" value="3"></v-stepper-item>
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


        </v-stepper-window>

        

        

        <v-stepper-actions
          @click:next="customActionForNext"
          @click:prev="customActionForPrev"
        >
          <template #prev="{ props }">
            <v-btn @click="() => props.onClick()"></v-btn>
          </template>
          <template #next="{ props }">
            <v-btn @click="() => props.onClick()"></v-btn>
          </template>
        </v-stepper-actions>
      </v-stepper>
    </v-container>
  </v-app>

    </div>
</template>
<script setup>
import { ref, computed } from 'vue';
import { VStepper, VStepperHeader, VStepperItem, VStepperActions, VStepperWindow, VStepperWindowItem } from 'vuetify/labs/VStepper';
import { VRadioGroup, VRadio } from 'vuetify/lib/components';

const step= ref(0)


// Import the JSON data
import factionsData from './faction.json';
import armiesData from './army.json';
import detachmentsData from './detachment.json';

// Reactive variables
const selectedFaction = ref(null);
const selectedArmy = ref(null);
const selectedDetachment = ref(null);

// Extract factions from JSON data
const factions = ref(factionsData.faction);

// Computed property to filter armies based on the selected faction
const filteredArmies = computed(() => {
  if (selectedFaction.value && armiesData[selectedFaction.value]) {
    return armiesData[selectedFaction.value];
  }
  return [];
});

// Computed property to filter detachments based on the selected army
const filteredDetachments = computed(() => {
  if (selectedArmy.value && detachmentsData[selectedArmy.value]) {
    return detachmentsData[selectedArmy.value];
  }
  return [];
});


const customActionForPrev = () => {
  // write custom login here like validation and some state changes if needed
  step.value--;
}
const customActionForNext = () => {
  // write custom login here like validation and some state changes if needed
  // alert("hola"); A CUSTOM EVENT
  // step.value++;

 
    
 
    if (
      
    (step.value == 0)&&(!!selectedFaction.value) ||
    (step.value == 1)&&(!!selectedArmy.value) ||
    (step.value == 2)&&(!!selectedDetachment.value)
  ){
      step.value++;

    }
 
  
}


</script>
<style>
    
</style>