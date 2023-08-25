<template>
    <div>
    Simulator lab
    <br>
   strong:  {{ strong }} 
   <br>
tough: {{ tough }}
<br>
{{ strongerThanTough }}
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
 
  const strong = ref (4)
  const tough = ref (4)

  const strongerThanTough = computed(() => {
  return strong.value > tough.value;
});
  
  </script>
  
  <style>
  /* Your CSS styling here */
  </style>
  