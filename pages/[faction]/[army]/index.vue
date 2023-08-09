<template>
    <div>
      <h1>{{ faction }} - {{ army }}</h1>
      <div v-if="armyData">
        <div v-for="armyName in armyData.units" :key="armyName" class="m-5">
          <p>{{ armyName }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  
  const armyData = ref([]);
  const { faction, army } = useRoute().params;
  
  onMounted(async () => {
    try {
      const res = await fetch(`/faction/${faction}/${army}/collection.json`);
      armyData.value = await res.json();
      console.log("Fetched Army Data: ", armyData.value);
    } catch (error) {
      console.error("Fetch Error: ", error);
    }
  });
  
  onMounted(() => {
    console.log("Army mounted");
  });
  </script>
  