<template lang="">
  <div>
    <v-btn>
      wololo
    </v-btn>
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
