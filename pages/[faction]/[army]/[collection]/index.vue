<template>
  <div>
    <h1>{{ armyUnit }}</h1>
    <br/>
    <p>{{ lore }}</p>
    <br/>
    <p>{{ army }}</p>
    <p>----</p>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const lore = ref("");
const route = useRoute(); // Move useRoute into the setup function

const faction = route.params.faction;
const army = route.params.army;
 const armyUnit = route.params.collection ;


onMounted(async () => {
  try {
    const res = await fetch(`/faction/${faction}/${army}/collection/${armyUnit}.json`);
    const unitData = await res.json();
    lore.value = unitData.lore;
  } catch (error) {
    console.error("Fetch Error: ", error);
  }
});
</script>
