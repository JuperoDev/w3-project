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
        console.log("Loaded armies from local storage:", this.armies);
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
    addCharacterToArmy(armyIndex, character) {
      this.armies[armyIndex].characters.push(character);
      this.saveArmies();
    },
    removeCharacterFromArmy(armyIndex, characterIndex) {
      this.armies[armyIndex].characters.splice(characterIndex, 1);
      this.saveArmies();
    },
    saveArmies() {
      localStorage.setItem('armies', JSON.stringify(this.armies));
      console.log("Saved armies to local storage:", this.armies);
    },
  },
});
