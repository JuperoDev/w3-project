<!-- Warlord.vue -->
<template>
    <span 
      class="text-sm text-blue-500 cursor-pointer hover:underline" 
      @click="toggleWarlord"
    >
      {{ isWarlord ? '' : 'Set as Warlord' }}
    </span>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const props = defineProps({
    unitId: {
      type: String,
      required: true
    },
    initialIsWarlord: {
      type: Boolean,
      default: false
    }
  });
  
  const emit = defineEmits(['update-warlord']);
  
  const isWarlord = ref(props.initialIsWarlord);
  
  const toggleWarlord = () => {
    isWarlord.value = !isWarlord.value;
    emit('update-warlord', props.unitId, isWarlord.value);
  };
  </script>