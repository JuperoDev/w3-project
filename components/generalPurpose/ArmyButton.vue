<template>
  <div class="all-wrap">
    <div class="">
      <div class="flex flex-row items-center">
        <div class="w-2/3 md:w-2/3 p-4">
          <hr v-if="armyName" />
          <!-- Updated button displaying armyName -->
          <button class="armyButton uppercase mr-2 " role="button" :data-content="armyName || 'No Army Name'">
            {{ armyName || 'No Army Name' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  armyName: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>



.armyButton,
.armyButton:after {
  width: 250px; /* Button width */
  height: 76px; /* Button height */
  line-height: 78px; /* Line height */
  font-size: 20px;
  font-family: 'Bebas Neue', sans-serif;
  background: linear-gradient(45deg, transparent 5%, #000 5%); /* Updated to black */
  border: 0;
  color: #fff;
  letter-spacing: 3px;
  /* box-shadow: 6px 0px 0px #f85e05; */
   /* Make shadow consistent on x and y axis */
  outline: transparent;
  position: relative;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  transition: 0.3s ease;
}

.armyButton:after {
  --slice-0: inset(50% 50% 50% 50%);
  --slice-1: inset(80% -6px 0 0);
  --slice-2: inset(50% -6px 30% 0);
  --slice-3: inset(10% -6px 85% 0);
  --slice-4: inset(40% -6px 43% 0);
  --slice-5: inset(80% -6px 5% 0);

  content: attr(data-content); /* Dynamic content based on the button's attribute */
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent 3%, #f85e05 3%, #f85e05 5%, #000 5%); /* Updated to black */
  text-shadow: -3px -3px 0px #F8F005, 3px 3px 0px #f85e05;
  clip-path: var(--slice-0);
}

.armyButton:hover {
  box-shadow: 6px 0px 0px #f85e05;
}

.armyButton:hover:after {
  animation: glitch 1s steps(2, end) infinite; /* Make the animation loop infinitely */
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
    width: 250px; /* Increased width for mobile screens */
    height: 86px; /* Increased height for mobile screens */
    line-height: 98px; /* Adjusted line-height */
  }
}

@media (min-width: 768px) {
  .armyButton,
  .armyButton:after {
    width: 400px; /* Larger width for larger screens */
    height: 86px;
    line-height: 88px;
  }
}
</style>
