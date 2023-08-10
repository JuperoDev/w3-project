<template>
  <div>
    <h1>{{ unitName }}</h1>
    <p>{{ lore }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const unitName = route.params.armyName;
const faction = route.params.faction;
const army = route.params.army;

const lore = ref("");

onMounted(async () => {
  try {
    const res = await fetch(`/faction/${faction}/${army}/collection/${unitName}.json`);
    const unitData = await res.json();
    lore.value = unitData.lore;
  } catch (error) {
    console.error("Fetch Error: ", error);
  }
});
</script>
