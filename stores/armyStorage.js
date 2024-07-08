import { defineStore } from 'pinia';

export const useArmyStorage = defineStore('armyStorage', {
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
      // Ensure each new army has empty arrays for each unit type
      army.battlelineUnits = [];
      army.characterUnits = [];
      army.otherUnits = [];
      this.armies.push(army);
      this.saveArmies();
    },
    removeArmy(index) {
      this.armies.splice(index, 1);
      this.saveArmies();
    },
    saveArmies() {
      localStorage.setItem('armies', JSON.stringify(this.armies));
    },
    addBattlelineUnitToArmy(armyIndex, unit) {
      const army = this.armies[armyIndex];
      if (!army.battlelineUnits.some(existingUnit => existingUnit.id === unit.id)) {
        army.battlelineUnits.push(unit);
        this.saveArmies();
      } 
    },
    loadBattlelineUnitsForArmy(armyIndex) {
      const army = this.armies[armyIndex];
      if (army.battlelineUnits === undefined) {
        army.battlelineUnits = [];
      }
      return army.battlelineUnits;
    },
    removeBattlelineUnitFromArmy(armyIndex, unitIndex) {
      const army = this.armies[armyIndex];
      if (army.battlelineUnits && army.battlelineUnits.length > unitIndex) {
        army.battlelineUnits.splice(unitIndex, 1);
        this.saveArmies();
      }
    },
    addCharacterUnitToArmy(armyIndex, unit) {
      const army = this.armies[armyIndex];
      if (!army.characterUnits.some(existingUnit => existingUnit.id === unit.id)) {
        army.characterUnits.push(unit);
        this.saveArmies();
      } 
    },
    loadCharacterUnitsForArmy(armyIndex) {
      const army = this.armies[armyIndex];
      if (army.characterUnits === undefined) {
        army.characterUnits = [];
      }
      return army.characterUnits;
    },
    removeCharacterUnitFromArmy(armyIndex, unitIndex) {
      const army = this.armies[armyIndex];
      if (army.characterUnits && army.characterUnits.length > unitIndex) {
        army.characterUnits.splice(unitIndex, 1);
        this.saveArmies();
      }
    },
    updateCharacterUnitEnhancement(armyIndex, unitIndex, enhancement) {
      const army = this.armies[armyIndex];
      if (army.characterUnits && army.characterUnits.length > unitIndex) {
        army.characterUnits[unitIndex].selectedEnhancement = enhancement;
        this.saveArmies();
      }
    },
    addOtherUnitToArmy(armyIndex, unit) {
      const army = this.armies[armyIndex];
      if (!army.otherUnits.some(existingUnit => existingUnit.id === unit.id)) {
        army.otherUnits.push(unit);
        this.saveArmies();
      } 
    },
    loadOtherUnitsForArmy(armyIndex) {
      const army = this.armies[armyIndex];
      if (army.otherUnits === undefined) {
        army.otherUnits = [];
      }
      return army.otherUnits;
    },
    removeOtherUnitFromArmy(armyIndex, unitIndex) {
      const army = this.armies[armyIndex];
      if (army.otherUnits && army.otherUnits.length > unitIndex) {
        army.otherUnits.splice(unitIndex, 1);
        this.saveArmies();
      }
    },
  },
});
