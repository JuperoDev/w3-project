<template>
    <div>
      <h1>{{ factionName }}</h1>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRouter } from "vue-router";
  
  const factionName = ref("");
  
  onMounted(() => {
    const router = useRouter();
    factionName.value = router.params.faction;
  });
  </script>
  
  <style lang=""></style>
  