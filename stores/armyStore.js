import { defineStore } from 'pinia';

export const useArmyStore = defineStore('armyStore', {
  state: () => ({
    armies: (typeof window !== 'undefined' && localStorage.getItem('armies')) ? JSON.parse(localStorage.getItem('armies')) : [],
  }),
  actions: {
    addArmy(army) {
      this.armies.push(army);
      this.saveArmies();
    },
    removeArmy(index) {
      this.armies.splice(index, 1);
      this.saveArmies();
    },
    saveArmies() {
      if (typeof window !== 'undefined' && localStorage) {
        localStorage.setItem('armies', JSON.stringify(this.armies));
      }
    },
  },
});
