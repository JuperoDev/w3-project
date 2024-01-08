import { defineStore } from "pinia";

export const useWh40kPasswordStore = defineStore("wh40kpassword", {
  state: () => ({
    password: '',
  }),

  // Action to set the password
  actions: {
    setPassword(password) {
      this.password = password;
    },
  },
  persist: true,
});
