<template>
  <div>
    <div v-if="data && data.faction" class="grid grid-cols-2 mt-5">
      <div v-for="factionName in data.faction" :key="factionName" class="m-1 px-2 pb-3 card">
        <nuxt-link :to="`/${factionName}`">
          <img :src="getFactionImage(factionName)" alt=""/>
          <v-btn class="w-56">{{ factionName }}</v-btn>
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
  } catch (error) {
    console.error("Fetch Error: ", error);
  }
});

const getFactionImage = (factionName) => {
  return `${factionName}.png`;
};
</script>

<style scoped>
img {
  transform: scale(90%);
}

.card {
  border: 1px solid rgb(228, 228, 228);
}
</style>
