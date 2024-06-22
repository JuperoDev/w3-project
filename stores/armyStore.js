import { defineStore } from 'pinia';

export const useArmyStore = defineStore('armyStore', {
  state: () => ({
    armies: [],
  }),
  actions: {
    initializeStore() {
      const storedArmies = localStorage.getItem('armies');
      if (storedArmies) {
        this.armies = JSON.parse(storedArmies);
      }
    },
    addArmy(army) {
      this.armies.push(army);
      this.saveArmies();
    },
    removeArmy(index) {
      this.armies.splice(index, 1);
      this.saveArmies();
    },
    addUnitToArmy(armyIndex, unit) {
      if (!this.armies[armyIndex].units) {
        this.armies[armyIndex].units = [];
      }
      this.armies[armyIndex].units.push(unit);
      this.saveArmies();
    },
    removeUnitFromArmy(armyIndex, unitIndex) {
      this.armies[armyIndex].units.splice(unitIndex, 1);
      this.saveArmies();
    },
    saveArmies() {
      localStorage.setItem('armies', JSON.stringify(this.armies));
    },
  },
});
