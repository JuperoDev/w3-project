import { defineStore } from 'pinia';

export const useWh40kPasswordStore = defineStore('wh40kpassword', {
  state: () => ({
    password: '',
    passwordSetDate: null,
  }),

  actions: {
    setPassword(password) {
      this.password = password;
      this.passwordSetDate = new Date().toISOString();
    },
    isPasswordExpired() {
      if (!this.passwordSetDate) return true;
      const passwordSetDate = new Date(this.passwordSetDate);
      const currentDate = new Date();
      const differenceInDays = (currentDate - passwordSetDate) / (1000 * 3600 * 24);
      return differenceInDays > 15;
    },
    resetPassword() {
      this.password = '';
      this.passwordSetDate = null;
    },
  },
  persist: true,
});
