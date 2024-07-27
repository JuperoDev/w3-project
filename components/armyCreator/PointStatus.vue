<template>
    <div class="status flex items-center w-48 h-16 rounded-md shadow-md">
      <!-- <div :class="['icon-container', statusClass]" class="flex items-center justify-center w-1/4 h-full rounded-l-md">
        <svg v-if="totalPoints > parsedPointList" xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" width="24px" height="24px">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zM12 17c-0.552 0-1-0.448-1-1s0.448-1 1-1 1 0.448 1 1-0.448 1-1 1zM13 12h-2V7h2v5z"/>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" width="24px" height="24px">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.707 8.707l-6 6a0.999 0.999 0 01-1.414 0l-3-3a0.999 0.999 0 111.414-1.414L11 12.586l5.293-5.293a0.999 0.999 0 111.414 1.414z"/>
        </svg>
      </div> -->
      <div class="flex-1 text-center bg-blue-500 h-full flex items-center justify-center rounded-md">
        <p class="text-zinc-900 text-sm font-bold">{{ totalPoints }} / {{ parsedPointList }} points</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  
  const props = defineProps({
    totalPoints: {
      type: Number,
      required: true
    },
    pointList: {
      type: [String, Number],
      required: true
    }
  });
  
  const parsedPointList = computed(() => {
    return Number(props.pointList);
  });
  
  const statusClass = computed(() => {
    return props.totalPoints > parsedPointList.value ? 'bg-yellow-500' : 'bg-green-500';
  });
  </script>
  
  <style scoped>
  .status {
    position: fixed;
    right:4rem;    bottom:4rem;  
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 12rem;  /* Adjusted size */
    height: 4rem;  /* Adjusted size */
    border: solid rgb(55, 55, 55) 1px;
    /* border-radius: 0.5rem; */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 11;
  }
  .icon-container {
    width: 25%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    /* border-radius: 0.5rem; */
  }

  .bg-blue-500 {
    background-color: #e3e5e8;
  }
  svg {
    width: 24px;  
    height: 24px;  
  }
  .text-white {
    color: white;
  }
  .text-zinc-900 {
    color: rgb(38, 38, 38);
  }
  </style>
  