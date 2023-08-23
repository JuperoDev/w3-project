<template>
    <div>
      <v-select label="Select Faction" :items="factions" v-model="selectedFaction"></v-select>
  
      <v-select label="Select Army" :items="selectedFactionData?.army || []" v-model="selectedArmy" :disabled="!selectedFaction"></v-select>
  
      <v-select label="Select Unit" :items="selectedArmyData?.units || []" v-model="selectedCollection" :disabled="!selectedArmy"></v-select>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  
  const factions = ref([]);
  const selectedFaction = ref('');
  const selectedFactionData = ref(null);
  const selectedArmy = ref('');
  const selectedArmyData = ref(null);
  const selectedCollection = ref('');
  
  // Fetch the data from the JSON file based on the selected faction
  const fetchFactionData = async () => {
    try {
      const response = await fetch(`/faction/${selectedFaction.value}/army.json`);
      selectedFactionData.value = await response.json();
      selectedArmy.value = ''; // Reset selected army when faction changes
    } catch (error) {
      console.error('Error fetching faction data:', error);
    }
  };
  
  // Fetch the data from the JSON file based on the selected army
  const fetchArmyData = async () => {
  try {
    const response = await fetch(`/faction/${selectedFaction.value}/${selectedArmy.value}/collection.json`);
    selectedArmyData.value = await response.json();
    selectedCollection.value = ''; // Reset selected collection when army changes
    console.log('Fetched Army Data:', selectedArmyData.value);
  } catch (error) {
    console.error('Error fetching army data:', error);
  }
};
  
  // Fetch the faction list data when the component is mounted
  onMounted(async () => {
    try {
      const response = await fetch('/faction.json');
      const jsonData = await response.json();
      factions.value = jsonData.faction;
    } catch (error) {
      console.error('Error fetching faction list:', error);
    }
  });
  
  // Watch for changes in the selected faction and fetch corresponding data
  watch(selectedFaction, fetchFactionData);
  
  // Watch for changes in the selected army and fetch corresponding data
  watch(selectedArmy, fetchArmyData);
  </script>
  