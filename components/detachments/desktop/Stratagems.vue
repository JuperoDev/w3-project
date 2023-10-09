<template>
    <div>
      <h3>Stratagems</h3>
      
      <div v-for="stratagem in stratagems" >
        <h4>{{ stratagem.name }}</h4>
        <p><strong>Subindex:</strong> {{ stratagem.subindex }}</p>
        <p><strong>Lore:</strong> {{ stratagem.lore }}</p>
        <p><strong>When:</strong> {{ stratagem.when }}</p>
        <p><strong>Target:</strong> {{ stratagem.target }}</p>
        <p><strong>Effect:</strong> {{ stratagem.effect }}</p>
        <!-- Add more properties as needed -->
  
        <!-- If the 'icon' property is an array, you might want to loop through it as well -->
        <div v-for="(icon, index) in stratagem.icon" :key="index">
          <img :src="icon" alt="Stratagem Icon" />
        </div>
  
        <p><strong>CP:</strong> {{ stratagem.cp }}</p>
        <p><strong>Color:</strong> {{ stratagem.color }}</p>
  
        <!-- You can add styling based on the 'color' property if needed -->
        <div :style="{ color: stratagem.color }">
          This text has a custom color.
        </div>
      </div>
    </div>
  </template>

<script setup>

const props = defineProps({
    stratagems: Array
});
</script>

