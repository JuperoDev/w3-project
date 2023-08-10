<template>
  <div>
    <h1>{{ faction }} - {{ army }}</h1>
    <div v-if="armyData">
      <div v-for="armyName in armyData.units" :key="armyName" class="m-5">
        <nuxt-link :to="`/${faction}/${army}/${armyName}`">
          <v-btn>
            <p>{{ armyName }}</p>
          </v-btn>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const armyData = ref([]);
const { faction, army } = useRoute().params;

// Function to replace unwanted characters with hyphens
const replaceUnwantedCharacters = (input) => {
  return input.replace(/[^a-zA-Z0-9-]/g, "-");
};

const sanitizedFaction = replaceUnwantedCharacters(faction);
const sanitizedArmy = replaceUnwantedCharacters(army);

onMounted(async () => {
  try {
    const res = await fetch(`/faction/${sanitizedFaction}/${sanitizedArmy}/collection.json`);
    armyData.value = await res.json();
    console.log("Fetching URL:", `/faction/${sanitizedFaction}/${sanitizedArmy}/collection.json`); // Log the URL being fetched
    console.log("Fetched Army Data: ", armyData.value);
  } catch (error) {
    console.error("Fetch Error: ", error);
  }
});

onMounted(() => {
  console.log("Army mounted");
});
</script>
