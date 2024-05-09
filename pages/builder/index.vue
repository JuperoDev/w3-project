<template>
    <div>
      <p>Your Army List</p>
      <br/>
      <ul v-if="armyList.length > 0">
        <li v-for="(item, index) in armyList" :key="index" @click="showDetails(item)">
          <p>Name: {{ item.name }}</p>
          <p>Faction: {{ item.faction }}</p>
          <p>Army: {{ item.army }}</p>
          <p>Detachment: {{ item.detachment }}</p>
          <br/>
        </li>
      </ul>
      <p v-else>No items found</p>
  
      <!-- Display details of selected item -->
      <div v-if="selectedItem">
        <h2>Selected Item Details</h2>
        <p><strong>Name:</strong> {{ selectedItem.name }}</p>
        <p><strong>Faction:</strong> {{ selectedItem.faction }}</p>
        <p><strong>Army:</strong> {{ selectedItem.army }}</p>
        <p><strong>Detachment:</strong> {{ selectedItem.detachment }}</p>
        <p><strong>Point Max:</strong> {{ selectedItem.pointMax }}</p>
        <p><strong>Point List:</strong> {{ selectedItem.pointList }}</p>
        <h3>Characters:</h3>
        <ul>
          <li v-for="(character, index) in selectedItem.characters" :key="index">
            <p><strong>Name:</strong> {{ character.name }}</p>
            <p><strong>Points:</strong> {{ character.points }}</p>
            <!-- Add more character details as needed -->
          </li>
        </ul>
        <h3>Battleline:</h3>
        <ul>
          <li v-for="(unit, index) in selectedItem.battleline" :key="index">
            <p><strong>Name:</strong> {{ unit.name }}</p>
            <p><strong>Points:</strong> {{ unit.points }}</p>
            <!-- Add more battleline unit details as needed -->
          </li>
        </ul>
        <!-- Add display for other datasheets, dedicated transports, allied units, etc. -->
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import armyListData from './mockArmy.json';
  
  const armyList = ref(armyListData.list.map(({ name, faction, army, detachment }) => ({ name, faction, army, detachment })));
  
  // Data property to store selected item details
  const selectedItem = ref(null);
  
  // Function to show details of the selected item
  const showDetails = (item) => {
    selectedItem.value = item;
  };
  </script>
  