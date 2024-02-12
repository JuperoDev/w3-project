<template>
    <div class="custom-select">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search"
        class="bg-gray-100"
        @input="onSearch"
        @blur="onBlur"
      >
      <ul v-show="isOpen && searchQuery.length >= 3" class="options">
        <li
          v-for="(option, index) in filteredOptions"
          :key="index"
          @click="selectOption(option)"
        >
          {{ option }}
        </li>
        <li v-if="moreElementsMessage" class="more-elements">
          {{ moreElementsMessage }}
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch } from 'vue';
  
  const selected = ref(null);
  const options = [
    'Broodlord', 'Deathleaper', 'Hive Tyrant', 'Neurotyrant', 'Old One Eye',
    'Parasite Of Mortrex', 'Tervigon', 'The Swarmlord', 'Winged Hive Tyrant',
    'Winged Tyranid Prime', 'Battleline', 'Gargoyles', 'Hormagaunts', 'Termagants',
    'Dedicated Transports', 'Tyrannocyte', 'Other', 'Barbgaunts', 'Biovores',
    'Carnifexes', 'Exocrine', 'Genestealers', 'Harpy', 'Haruspex', 'Hive Crone',
    'Hive Guard', 'Lictor', 'Maleceptor', 'Mawloc', 'Mucolid Spores', 'Neurogaunts',
    'Neurolictor', 'Norn Assimilator', 'Norn Emissary', 'Psychophage', 'Pyrovores',
    'Raveners', 'Ripper Swarms', 'Screamer-killer', 'Spore Mines', 'Sporocyst',
    'Toxicrene', 'Trygon', 'Tyranid Warriors With Melee Bio-weapons',
    'Tyranid Warriors With Ranged Bio-weapons', 'Tyrannofex', 'Tyrant Guard',
    'Venomthropes', 'Von Ryan’s Leapers', 'Zoanthropes'
  ];
  const searchQuery = ref('');
  const isOpen = ref(false);
  const moreElementsMessage = ref('');
  
  const filteredOptions = computed(() => {
    if (searchQuery.value.length < 3) {
      return [];
    }
  
    const filtered = options.filter(option =>
      option.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  
    if (filtered.length > 5) {
      moreElementsMessage.value = `There are ${filtered.length - 5} more elements`;
      return filtered.slice(0, 5);
    } else {
      moreElementsMessage.value = '';
      return filtered;
    }
  });
  
  const onSearch = () => {
    isOpen.value = true;
    moreElementsMessage.value = '';
  };
  
  const onBlur = () => {
    // Delay hiding the options to allow click events on options
    setTimeout(() => {
      isOpen.value = false;
    }, 200);
  };
  
  const selectOption = (option) => {
    selected.value = option;
    isOpen.value = false;
  };
  
  watch(selected, (newValue) => {
    searchQuery.value = newValue;
  });
  </script>
  
  <style>
    .custom-select {
      position: relative;
      width: 200px; /* adjust width as needed */
    }
    input[type="text"] {
      width: 100%;
      padding: 5px 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    .options {
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      margin: 0;
      padding: 0;
      list-style: none;
      background-color: #fff;
      border: 1px solid #ccc;
      border-top: none;
      border-radius: 0 0 4px 4px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .options li {
      padding: 5px 10px;
      cursor: pointer;
    }
    .options li:hover {
      background-color: #f0f0f0;
    }
    .more-elements {
      text-align: center;
      font-size: 0.8em;
      color: #888;
    }
  </style>
  