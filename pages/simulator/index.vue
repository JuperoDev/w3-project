<template>
   <div class="p-5">
        <!-- <SimulatorPick :attackRole="true" /> -->
      <br />
      <!-- <SimulatorPick :attackRole="false" /> -->
      <Odds/>
      <!-- <div class="simulator--operations">
        <label for="requiredScore">Required Score: </label>
        <input v-model="requiredScore" type="number" min="1" max="6" />
        <br />
        <label for="numberOfAttempts">Number of Attempts: </label>
        <input v-model="numberOfAttempts" type="number" min="1" />
        <br />
        <button @click="calculateOdds">Calculate Odds</button>
  
        <div v-if="oddsCalculated">
          <p>Odds of scoring {{ requiredScore }} or higher: {{ successOdds }}</p>
          <p>Odds of scoring less than {{ requiredScore }}: {{ failureOdds }}</p>
        </div>
      </div>  -->
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const requiredScore = ref(4);
  const numberOfAttempts = ref(1);
  const oddsCalculated = ref(false);
  const successOdds = ref(0);
  const failureOdds = ref(0);
  
  const calculateOdds = () => {
    // Ensure the input is valid
    if (requiredScore.value < 1 || requiredScore.value > 6 || numberOfAttempts.value <= 0) {
      oddsCalculated.value = false;
      return;
    }
  
    // Calculate odds
    const totalAttempts = numberOfAttempts.value;
    const successCount = simulateDiceRolls(totalAttempts, requiredScore.value);
    const failureCount = totalAttempts - successCount;
  
    // Update reactive variables
    successOdds.value = successCount / totalAttempts;
    failureOdds.value = failureCount / totalAttempts;
    oddsCalculated.value = true;
  };
  
  // Simulate dice rolls
  const simulateDiceRolls = (totalAttempts, requiredScore) => {
    let count = 0;
    for (let i = 0; i < totalAttempts; i++) {
      const randomRoll = Math.floor(Math.random() * 6) + 1;
      if (randomRoll >= requiredScore) {
        count++;
      }
    }
    return count;
  };
  </script>
  