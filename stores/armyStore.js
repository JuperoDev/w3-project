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
      const army = this.armies[armyIndex];
      const character = army.characters[characterIndex];
      if (enhancement && enhancement.name) {
        character.enhancement = enhancement;
      } else {
        // Handle the case where the enhancement is removed
        character.enhancement = { name: '', points: 0 };
      }
    }
    ,
    saveArmies() {
      localStorage.setItem('armies', JSON.stringify(this.armies));
    },
  },
});
