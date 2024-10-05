import { defineStore } from 'pinia';

export const useWh40kPasswordStore = defineStore('wh40kpassword', {
  state: () => ({
    password: '', // Store the current password
    timestamp: 0, // Timestamp to track when the password was set
  }),

  actions: {
    // Set a new password and save it to localStorage with a timestamp
    setPassword(password) {
      this.password = password;
      this.timestamp = Date.now();
      localStorage.setItem('wh40kpassword', password); // Save password
      localStorage.setItem('wh40kpasswordTimestamp', this.timestamp); // Save timestamp
    },

    // Verify if the given password matches the stored password
    validatePassword(inputPassword) {
      return this.password === inputPassword;
    },

    // Remove the password from the store and localStorage
    resetPassword() {
      this.password = '';
      this.timestamp = 0;
      localStorage.removeItem('wh40kpassword');
      localStorage.removeItem('wh40kpasswordTimestamp');
    },

    // Load the password and timestamp from localStorage if available
    initializeStore() {
      const storedPassword = localStorage.getItem('wh40kpassword');
      const storedTimestamp = localStorage.getItem('wh40kpasswordTimestamp');
      if (storedPassword && storedTimestamp) {
        this.password = storedPassword;
        this.timestamp = parseInt(storedTimestamp, 10);
      }
    },

    // Check if the stored password is expired 
    // days * hours * min * sec * milisec  (e.g., 30 day expiration = 30 * 24 * 60 * 60 * 1000)
    isPasswordExpired() {
      const oneDayInMilliseconds = 30 * 24 * 60 * 60 * 1000;
      const currentTime = Date.now();
      return (currentTime - this.timestamp) > oneDayInMilliseconds;
    },
  },
});
