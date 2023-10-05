<template>
    <div>
      Detachment: {{ detachment }}
    </div>
  </template>
  
  <script setup>
  import { useRoute } from "vue-router";
  
  const route = useRoute();
  const faction = route.params.faction;
  const army = route.params.army;
  const detachment = route.params.detachment;
  </script>