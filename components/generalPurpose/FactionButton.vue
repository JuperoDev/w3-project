<template>
    <div>
      <v-btn>
        <router-link :to="`/${faction}`">Go Back</router-link>
      </v-btn>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const faction = ref(route.params.faction);
  </script>
  