<template>
    <div>
        eeaeaeae
      <!-- <div v-if="data && data.army">
        <div v-for="armyName in data.army" :key="armyName" class="m-5">
          <nuxt-link :to="`/${armyName}`">
            <v-btn>{{ armyName }}</v-btn>
          </nuxt-link>
        </div>
      </div> -->
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, useRouter } from "vue";
  
  const data = ref(null);
  const router = useRouter();
  
  onMounted(async () => {
    // const factionName = router.params.faction;  // Get the dynamic faction name from the route
  
    // try {
    //   const res = await fetch(`/${factionName}/army.json`);
    //   data.value = await res.json();
    //   console.log("Fetched Data: A", data.value);
    // } catch (error) {
    //   console.error("Fetch Error: A", error);
    // }
  });
  </script>
  