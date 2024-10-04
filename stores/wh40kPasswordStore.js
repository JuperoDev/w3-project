import { defineStore } from 'pinia';

export const useWh40kPasswordStore = defineStore('wh40kpassword', {
  state: () => ({
    password: '', // Store the current password
  }),

  actions: {
    // Set a new password and save it to localStorage
    setPassword(password) {
      this.password = password;
      localStorage.setItem('wh40kpassword', password); // Save manually to localStorage
    },

    // Verify if the given password matches the stored password
    validatePassword(inputPassword) {
      return this.password === inputPassword;
    },

    // Remove the password from the store and localStorage
    resetPassword() {
      this.password = '';
      localStorage.removeItem('wh40kpassword'); // Remove from localStorage
    },

    // Load the password from localStorage if available
    initializeStore() {
      const storedPassword = localStorage.getItem('wh40kpassword');
      if (storedPassword) {
        this.password = storedPassword;
      }
    },
  },
});
