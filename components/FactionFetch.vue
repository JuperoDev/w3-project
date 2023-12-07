<template>
  <div>

    <div v-if="data && data.faction">
      <div v-for="factionName in data.faction" :key="factionName" class="m-5">
        <nuxt-link :to="`/${factionName}`">
          <v-btn>{{ factionName }}</v-btn>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const data = ref(null);

onMounted(async () => {
  try {
    const res = await fetch("/faction.json");
    data.value = await res.json();
    // console.log("Fetched Data: ", data.value);
  } catch (error) {
    console.error("Fetch Error: ", error);
  }
});
</script>

<style></style>
