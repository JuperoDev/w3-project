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
    addCharacterToArmy(armyIndex, character) {
      if (!this.armies[armyIndex].characters) {
        this.armies[armyIndex].characters = [];
      }
      this.armies[armyIndex].characters.push(character);
      this.saveArmies();
    },
    removeCharacterFromArmy(armyIndex, characterIndex) {
      this.armies[armyIndex].characters.splice(characterIndex, 1);
      this.saveArmies();
    },
    updateCharacterEnhancement(armyIndex, characterIndex, enhancement) {
      if (this.armies[armyIndex] && this.armies[armyIndex].characters[characterIndex]) {
        this.armies[armyIndex].characters[characterIndex].enhancements = enhancement.name;
        this.armies[armyIndex].characters[characterIndex].enhancementPoints = enhancement.points;
        this.saveArmies();
      }
    },
    saveArmies() {
      localStorage.setItem('armies', JSON.stringify(this.armies));
    },
  },
});
