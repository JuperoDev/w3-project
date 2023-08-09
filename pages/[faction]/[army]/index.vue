<template>
    <div>
      {{faction}}
     
  
      <div v-if="factionData && factionData.army">
        <div v-for="armyName in factionData.army" :key="armyName" class="m-5">
         
          <nuxt-link :to="`/${faction}/${armyName}`">
            <v-btn>{{ armyName }}</v-btn>
          </nuxt-link>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  
  const factionData = ref(null);
  const {faction} = useRoute().params;
  const testUrl = useRoute().params.faction
  
  
  onMounted(async () => {
    try {
      const factionParam = useRoute().params.faction;
      const armyParam = useRoute().params.army;
      const res = await fetch(`/faction/${factionParam}/${armyParam}/collection.json`);
      factionData.value = await res.json();
      console.log("Fetched Faction Data: ", factionData.value);
    } catch (error) {
      console.error("Fetch Error: ", error);
    }
  });
  
  onMounted(() => {
    console.log('Faction mounted');
  });
  </script>
  