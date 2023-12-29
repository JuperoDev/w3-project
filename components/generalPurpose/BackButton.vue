<template>
    <div>
      <v-btn @click="goBack" >Go Back</v-btn>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    setup() {
      const goBack = () => {
        window.history.back();
      };
  
      return {
        goBack,
      };
    },
  };
  </script>
  
  