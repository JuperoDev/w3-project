<template lang="">
  <div>
    <div v-if="data && data.army">
      <div v-for="armyName in data.army" class="m-5">
        <v-btn>{{ armyName }}</v-btn>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";

const data = ref(null);

onMounted(async () => {
  try {
    const res = await fetch("/army.json");
    data.value = await res.json();
    console.log("Fetched Data: ", data.value);
  } catch (error) {
    console.error("Fetch Error: ", error);
  }
});
</script>
<style lang=""></style>
