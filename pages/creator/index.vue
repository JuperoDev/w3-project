<template>
    <div>
      <h1>Army Builder</h1>
      <div class="unit-list">
        <h2>Available Units</h2>
        <ul>
          <li v-for="(unit, index) in units" :key="index">
            {{ unit.parentUnit }}
            <button @click="addUnit(unit)">Add</button>
          </li>
        </ul>
      </div>
      <div class="selected-units">
        <h2>Selected Units</h2>
        <ul>
          <li v-for="(unit, index) in selectedUnits" :key="index">
            {{ unit.parentUnit }} x{{ unit.quantity }}
            <button @click="removeUnit(index)">Remove</button>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const units = ref([]);
  const selectedUnits = ref([]);
  
  const fetchUnitDetails = async (unitName) => {
    const basePath = '/faction/xenos/tyranids/collection';
    const response = await fetch(`${basePath}/${unitName}.json`);
    if (!response.ok) {
      console.error(`Failed to fetch ${unitName}.json`);
      return null;
    }
    return await response.json();
  };
  
  const fetchUnits = async () => {
    const basePath = '/faction/xenos/tyranids';
    const response = await fetch(`${basePath}/collection.json`);
    if (!response.ok) {
      console.error('Failed to fetch collection.json');
      return;
    }
    const collection = await response.json();
    const unitPromises = collection.units.map(fetchUnitDetails);
    const fetchedUnits = await Promise.all(unitPromises);
    units.value = fetchedUnits.filter(unit => unit !== null);
  };
  
  onMounted(fetchUnits);
  
  const addUnit = (unit) => {
    const existingUnit = selectedUnits.value.find(u => u.parentUnit === unit.parentUnit);
    if (existingUnit) {
      existingUnit.quantity++;
    } else {
      selectedUnits.value.push({ ...unit, quantity: 1 });
    }
  };
  
  const removeUnit = (index) => {
    if (selectedUnits.value[index].quantity > 1) {
      selectedUnits.value[index].quantity--;
    } else {
      selectedUnits.value.splice(index, 1);
    }
  };
  </script>
  
  <style scoped>
  .unit-list, .selected-units {
    display: inline-block;
    vertical-align: top;
    margin-right: 20px;
  }
  
  .unit-list ul, .selected-units ul {
    list-style-type: none;
    padding: 0;
  }
  
  .unit-list li, .selected-units li {
    margin: 5px 0;
  }
  </style>
  