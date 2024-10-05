<template>
  <div>
    <div v-if="!hasEnteredPassword" class="p-5">
      <p>The file you want to see is password protected.</p>
      <p><strong>I have changed the password</strong></p>
      <label for="password">Enter the password: </label>
      <input
        type="password"
        id="password"
        v-model="password"
        @keydown.enter="checkPassword"
      />
      <div class="button-container p-5">
        <v-btn>
          <button @click="checkPassword">Submit</button>
        </v-btn>
      </div>
    </div>
    <div v-if="!!hasEnteredPassword">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useWh40kPasswordStore } from '@/stores/wh40kPasswordStore';

const wh40kPasswordStore = useWh40kPasswordStore();
const password = ref('');
const hasEnteredPassword = ref(false);

// Function to check the password and update the status
const checkPassword = () => {
  if (password.value === 'cobra') {
    wh40kPasswordStore.setPassword(password.value);
    hasEnteredPassword.value = true;
  }
};

// Initialization logic to load stored password and validate expiration
const initialize = () => {
  wh40kPasswordStore.initializeStore(); // Initialize store from localStorage
  if (wh40kPasswordStore.password && !wh40kPasswordStore.isPasswordExpired()) {
    hasEnteredPassword.value = true;
  } else {
    wh40kPasswordStore.resetPassword(); // Reset if expired
  }
};

onMounted(initialize);
</script>

<style scoped>
input {
  border: 1px solid gainsboro;
}
</style>
