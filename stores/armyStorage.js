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
      army.characterUnits = [];
      army.battlelineUnits = [];
      army.otherUnits = [];
      army.dedicatedTransportUnits = [];
      army.alliedUnits = [];  // Add this line to initialize alliedUnits
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

    // Character Units
    addCharacterUnitToArmy(armyIndex, unit) {
      const army = this.armies[armyIndex];
      if (!army.characterUnits.some(existingUnit => existingUnit.id === unit.id)) {
        army.characterUnits.push({
          ...unit,
          basicPoints: parseInt(unit.basicPoints) || 0,
          selectedEnhancement: unit.selectedEnhancement ? {
            ...unit.selectedEnhancement,
            points: parseInt(unit.selectedEnhancement.points) || 0
          } : null
        });
        this.saveArmies();
      }
    },
    loadCharacterUnitsForArmy(armyIndex) {
      const army = this.armies[armyIndex];
      if (!army.characterUnits) {
        army.characterUnits = [];
      }
      return army.characterUnits;
    },
    removeCharacterUnitFromArmy(armyIndex, unitId) {
      const army = this.armies[armyIndex];
      const index = army.characterUnits.findIndex(unit => unit.id === unitId);
      if (index !== -1) {
        army.characterUnits.splice(index, 1);
        this.saveArmies();
      }
    },
    updateCharacterUnitInArmy(armyIndex, unitId, updatedUnit) {
      const army = this.armies[armyIndex];
      const unitIndex = army.characterUnits.findIndex(unit => unit.id === unitId);
      if (unitIndex !== -1) {
        army.characterUnits[unitIndex] = { 
          ...army.characterUnits[unitIndex], 
          ...updatedUnit,
          basicPoints: parseInt(updatedUnit.basicPoints) || 0,
          selectedEnhancement: updatedUnit.selectedEnhancement ? {
            ...updatedUnit.selectedEnhancement,
            points: parseInt(updatedUnit.selectedEnhancement.points) || 0
          } : null
        };
        this.saveArmies();
      }
    },

    // Battleline Units
    addBattlelineUnitToArmy(armyIndex, unit) {
      const army = this.armies[armyIndex];
      if (!army.battlelineUnits.some(existingUnit => existingUnit.id === unit.id)) {
        army.battlelineUnits.push({
          ...unit,
          basicPoints: parseInt(unit.basicPoints) || 0
        });
        this.saveArmies();
      }
    },
    loadBattlelineUnitsForArmy(armyIndex) {
      const army = this.armies[armyIndex];
      if (!army.battlelineUnits) {
        army.battlelineUnits = [];
      }
      return army.battlelineUnits;
    },
    removeBattlelineUnitFromArmy(armyIndex, unitId) {
      const army = this.armies[armyIndex];
      const index = army.battlelineUnits.findIndex(unit => unit.id === unitId);
      if (index !== -1) {
        army.battlelineUnits.splice(index, 1);
        this.saveArmies();
      }
    },
    updateBattlelineUnitInArmy(armyIndex, unitId, updatedUnit) {
      const army = this.armies[armyIndex];
      const unitIndex = army.battlelineUnits.findIndex(unit => unit.id === unitId);
      if (unitIndex !== -1) {
        army.battlelineUnits[unitIndex] = { 
          ...army.battlelineUnits[unitIndex], 
          ...updatedUnit,
          basicPoints: parseInt(updatedUnit.basicPoints) || 0
        };
        this.saveArmies();
      }
    },

    // Other Units
    addOtherUnitToArmy(armyIndex, unit) {
      const army = this.armies[armyIndex];
      if (!army.otherUnits.some(existingUnit => existingUnit.id === unit.id)) {
        army.otherUnits.push({
          ...unit,
          basicPoints: parseInt(unit.basicPoints) || 0,
          equipmentQuantities: unit.equipmentQuantities || {},
          wargearAbilities: unit.wargearAbilities || {}
        });
        this.saveArmies();
      }
    },
    loadOtherUnitsForArmy(armyIndex) {
      const army = this.armies[armyIndex];
      if (!army.otherUnits) {
        army.otherUnits = [];
      }
      return army.otherUnits;
    },
    removeOtherUnitFromArmy(armyIndex, unitId) {
      const army = this.armies[armyIndex];
      const index = army.otherUnits.findIndex(unit => unit.id === unitId);
      if (index !== -1) {
        army.otherUnits.splice(index, 1);
        this.saveArmies();
      }
    },
    updateOtherUnitInArmy(armyIndex, unitId, updatedUnit) {
      const army = this.armies[armyIndex];
      const unitIndex = army.otherUnits.findIndex(unit => unit.id === unitId);
      if (unitIndex !== -1) {
        army.otherUnits[unitIndex] = { 
          ...army.otherUnits[unitIndex], 
          ...updatedUnit,
          basicPoints: parseInt(updatedUnit.basicPoints) || 0,
          equipmentQuantities: updatedUnit.equipmentQuantities || {},
          wargearAbilities: updatedUnit.wargearAbilities || {}
        };
        this.saveArmies();
      }
    },

    // Dedicated Transport Units
    addDedicatedTransportToArmy(armyIndex, unit) {
      const army = this.armies[armyIndex];
      if (!army.dedicatedTransportUnits.some(existingUnit => existingUnit.id === unit.id)) {
        army.dedicatedTransportUnits.push({
          ...unit,
          basicPoints: parseInt(unit.basicPoints) || 0
        });
        this.saveArmies();
      }
    },
    loadDedicatedTransportsForArmy(armyIndex) {
      const army = this.armies[armyIndex];
      if (!army.dedicatedTransportUnits) {
        army.dedicatedTransportUnits = [];
      }
      return army.dedicatedTransportUnits;
    },
    removeDedicatedTransportFromArmy(armyIndex, unitId) {
      const army = this.armies[armyIndex];
      const index = army.dedicatedTransportUnits.findIndex(unit => unit.id === unitId);
      if (index !== -1) {
        army.dedicatedTransportUnits.splice(index, 1);
        this.saveArmies();
      }
    },
    updateDedicatedTransportInArmy(armyIndex, unitId, updatedUnit) {
      const army = this.armies[armyIndex];
      const unitIndex = army.dedicatedTransportUnits.findIndex(unit => unit.id === unitId);
      if (unitIndex !== -1) {
        army.dedicatedTransportUnits[unitIndex] = { 
          ...army.dedicatedTransportUnits[unitIndex], 
          ...updatedUnit,
          basicPoints: parseInt(updatedUnit.basicPoints) || 0
        };
        this.saveArmies();
      }
    },

    // Allied Units
    addAlliedUnitToArmy(armyIndex, unit) {
      const army = this.armies[armyIndex];
      if (!army.alliedUnits.some(existingUnit => existingUnit.id === unit.id)) {
        army.alliedUnits.push({
          ...unit,
          basicPoints: parseInt(unit.basicPoints) || 0
        });
        this.saveArmies();
      }
    },
    loadAlliedUnitsForArmy(armyIndex) {
      const army = this.armies[armyIndex];
      if (!army.alliedUnits) {
        army.alliedUnits = [];
      }
      return army.alliedUnits;
    },
    removeAlliedUnitFromArmy(armyIndex, unitId) {
      const army = this.armies[armyIndex];
      const index = army.alliedUnits.findIndex(unit => unit.id === unitId);
      if (index !== -1) {
        army.alliedUnits.splice(index, 1);
        this.saveArmies();
      }
    },
    updateAlliedUnitInArmy(armyIndex, unitId, updatedUnit) {
      const army = this.armies[armyIndex];
      const unitIndex = army.alliedUnits.findIndex(unit => unit.id === unitId);
      if (unitIndex !== -1) {
        army.alliedUnits[unitIndex] = { 
          ...army.alliedUnits[unitIndex], 
          ...updatedUnit,
          basicPoints: parseInt(updatedUnit.basicPoints) || 0
        };
        this.saveArmies();
      }
    },

    // General methods
    getTotalPoints(armyIndex) {
      const army = this.armies[armyIndex];
      const characterPoints = army.characterUnits.reduce((sum, unit) => sum + (parseInt(unit.basicPoints) || 0) + (unit.selectedEnhancement ? (parseInt(unit.selectedEnhancement.points) || 0) : 0), 0);
      const battlelinePoints = army.battlelineUnits.reduce((sum, unit) => sum + (parseInt(unit.basicPoints) || 0), 0);
      const otherPoints = army.otherUnits.reduce((sum, unit) => sum + (parseInt(unit.basicPoints) || 0), 0);
      const dedicatedTransportPoints = army.dedicatedTransportUnits.reduce((sum, unit) => sum + (parseInt(unit.basicPoints) || 0), 0);
      const alliedPoints = army.alliedUnits.reduce((sum, unit) => sum + (parseInt(unit.basicPoints) || 0), 0);
      return characterPoints + battlelinePoints + otherPoints + dedicatedTransportPoints + alliedPoints;
    },

    updateArmyDetails(armyIndex, details) {
      const army = this.armies[armyIndex];
      Object.assign(army, details);
      this.saveArmies();
    },

    updateWargearQuantitiesInUnit(armyIndex, unitId, quantities, abilities) {
      const army = this.armies[armyIndex];
      const unitIndex = army.otherUnits.findIndex(unit => unit.id === unitId);
      if (unitIndex !== -1) {
        army.otherUnits[unitIndex].equipmentQuantities = quantities;
        army.otherUnits[unitIndex].wargearAbilities = abilities;
        this.saveArmies();
      }
    }
  },
});
