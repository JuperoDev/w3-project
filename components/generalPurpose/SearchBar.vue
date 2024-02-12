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
    <ul v-show="isOpen && searchQuery.length >= 3" class="options capitalize">
      <li
        v-for="(option, index) in filteredOptions"
        :key="index"
        @click="navigate(option)"
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
import searchResults from "./searchResults.json";
import { useRouter } from 'vue-router';

const router = useRouter();
const selected = ref(null);
const searchQuery = ref('');
const isOpen = ref(false);
const moreElementsMessage = ref('');
const options = [];

// Flatten the nested object structure into a single array
for (const category in searchResults) {
  for (const subCategory in searchResults[category]) {
    options.push(...searchResults[category][subCategory]);
  }
}

const filteredOptions = computed(() => {
  if (searchQuery.value.length < 3) {
    return [];
  }

  const filtered = options.filter(option =>
    option.toLowerCase().includes(searchQuery.value.toLowerCase())
  );

  if (filtered.length > 8) {
    moreElementsMessage.value = `There are ${filtered.length - 8} more elements`;
    return filtered.slice(0, 8);
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

const navigate = (option) => {
  const currentRoute = router.currentRoute.value;
  const currentCategory = currentRoute.params.category;
  const currentSubCategory = currentRoute.params.subCategory;

  for (const category in searchResults) {
    for (const subCategory in searchResults[category]) {
      if (searchResults[category][subCategory].includes(option)) {
        if (currentCategory === category && currentSubCategory === subCategory) {
          const formattedOption = option.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-');
          router.push(`/${category}/${subCategory}/${formattedOption}`);
        } else {
          const formattedOption = option.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-');
          router.push(`/${category}/${subCategory}/${formattedOption}`);
        }
        return;
      }
    }
  }
};;

watch(selected, (newValue) => {
  searchQuery.value = newValue;
});
</script>
  <style scoped>

  ul{
    z-index: 999;
  }
    .custom-select {
      position: relative;
      width: 100%; /* adjust width as needed */
      max-width: 600px;
      
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
  