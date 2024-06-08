<template>
  <div>
    <h1>Army Builder</h1>

    <v-stepper :items="['', '', '', '']">
      <template v-slot:item.1>
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
      </template>

      

      <template v-slot:item.2>
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
      </template>

      <template v-slot:item.3>
        <v-card title="Choose Battle Size" flat>
          <ArmyBuilderSize />
        </v-card>
      </template>

      <template v-slot:item.4>
        <v-card title="Choose Detachment" flat>
          <ArmyBuilderDetachment />
        </v-card>
      </template>


    </v-stepper>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { VStepper } from 'vuetify/labs/VStepper';
import { VRadioGroup, VRadio } from 'vuetify/lib/components';

// Import the JSON data
import factionsData from './faction.json';
import armiesData from './army.json';

// Reactive variables
const selectedFaction = ref(null);
const selectedArmy = ref(null);

// Extract factions from JSON data
const factions = ref(factionsData.faction);

// Computed property to filter armies based on the selected faction
const filteredArmies = computed(() => {
  if (selectedFaction.value && armiesData[selectedFaction.value]) {
    return armiesData[selectedFaction.value];
  }
  return [];
});

//alert

const alerta = () =>{
  alert('alerta')
}
</script>

<style>
/* Add any styles you need here */
</style>