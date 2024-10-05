<template>
    <nuxt-link :to="destination">
      <button class="armyButton uppercase m-2" :data-content="armyName">
        {{ armyName }}
      </button>
    </nuxt-link>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  const props = defineProps({
    armyName: {
      type: String,
      required: false,
    },
    destination: {
      type: String,
      required: true,
    },
  });
  </script>
  
  <style scoped>
  .armyButton,
  .armyButton:after {
    width: auto; /* Set width to auto to accommodate varying text lengths */
    min-width: 400px; /* Minimum width to keep some uniformity */
    max-width: 400px; /* Maximum width for wrapping */
    padding: 10px 20px; /* Added padding for better text spacing */
    min-height: 60px; /* Allow height to grow with text */
    line-height: 1.2; /* Adjusted line height for wrapped text */
    font-size: 16px;
    font-family: 'Bebas Neue', sans-serif;
    background: linear-gradient(45deg, transparent 5%, #000 5%);
    border: 0;
    color: #fff;
    letter-spacing: 3px;
    outline: transparent;
    position: relative;
    user-select: none;
    transition: 0.3s ease;
    word-wrap: break-word; /* Ensure words break correctly */
    white-space: normal; /* Allow text to wrap */
    text-align: center; /* Center-align the text */
  }
  
  .armyButton:after {
    --slice-0: inset(50% 50% 50% 50%);
    --slice-1: inset(80% -6px 0 0);
    --slice-2: inset(50% -6px 30% 0);
    --slice-3: inset(10% -6px 85% 0);
    --slice-4: inset(40% -6px 43% 0);
    --slice-5: inset(80% -6px 5% 0);
  
    content: attr(data-content);
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 3%, #f85e05 3%, #f85e05 5%, #000 5%);
    text-shadow: -3px -3px 0px #F8F005, 3px 3px 0px #f85e05;
    clip-path: var(--slice-0);
    word-wrap: break-word; /* Ensure the after pseudo-element text breaks correctly */
    white-space: normal; /* Allow the text in pseudo-element to wrap */
    text-align: center; /* Center-align the text */
  }
  
  .armyButton:hover {
    box-shadow: 6px 0px 0px #f85e05;
  }
  
  .armyButton:hover:after {
    animation: glitch 1s steps(2, end) infinite;
  }
  
  @keyframes glitch {
    0% {
      clip-path: var(--slice-1);
      transform: translate(-20px, -10px);
    }
    10% {
      clip-path: var(--slice-3);
      transform: translate(10px, 10px);
    }
    20% {
      clip-path: var(--slice-1);
      transform: translate(-10px, 10px);
    }
    30% {
      clip-path: var(--slice-3);
      transform: translate(0px, 5px);
    }
    40% {
      clip-path: var(--slice-2);
      transform: translate(-5px, 0px);
    }
    50% {
      clip-path: var(--slice-3);
      transform: translate(5px, 0px);
    }
    60% {
      clip-path: var(--slice-4);
      transform: translate(5px, 10px);
    }
    70% {
      clip-path: var(--slice-2);
      transform: translate(-10px, 10px);
    }
    80% {
      clip-path: var(--slice-5);
      transform: translate(20px, -10px);
    }
    90% {
      clip-path: var(--slice-1);
      transform: translate(-10px, 0px);
    }
    100% {
      clip-path: var(--slice-1);
      transform: translate(0);
    }
  }
  
  @media (max-width: 768px) {
    .armyButton,
    .armyButton:after {
      width: auto;
      /* width: 500px; */
      min-width: 380px;
       /* Smaller width for mobile screens */
      max-width: 500px; 
      /* Reduced max-width for mobile */
      padding: 10px;
      font-size: 14px; /* Smaller font size for mobile */
    }


    
  }


  @media (max-width: 900px) {
    .armyButton,
    .armyButton:after {
      width: auto;
      /* width: 500px; */
      min-width: 300px;
       /* Smaller width for mobile screens */
      max-width: 300px; 
      /* Reduced max-width for mobile */
      padding: 10px;
      font-size: 14px; /* Smaller font size for mobile */
    }


    
  }



  </style>
  