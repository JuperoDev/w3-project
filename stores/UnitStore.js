import { defineStore } from 'pinia';

export const useUnitStore = defineStore('savedUnits', {
  state: () => ({
    elements: [], // Array to store elements (unit names)
    info: [], // Array to store info (corresponding URLs)
  }),

  actions: {
    initializeStore() {
      const storedElements = localStorage.getItem('elements');
      const storedInfo = localStorage.getItem('info');

      if (storedElements) {
        this.elements = JSON.parse(storedElements);
      }
      if (storedInfo) {
        this.info = JSON.parse(storedInfo);
      }
    },

    addOrRemoveElement(elementName, isAdd, urlStore) {
      if (isAdd) {
        if (!this.elements.includes(elementName)) {
          this.elements.push(elementName);
          this.info.push(urlStore);
          this.saveData();
        }
      } else {
        const index = this.elements.indexOf(elementName);
        if (index !== -1) {
          this.elements.splice(index, 1);
          this.info.splice(index, 1);
          this.saveData();
        }
      }
    },

    saveData() {
      localStorage.setItem('elements', JSON.stringify(this.elements));
      localStorage.setItem('info', JSON.stringify(this.info));
    },
  },

  getters: {
    isElementInList: (state) => (elementName) => {
      return state.elements.includes(elementName);
    },
  },
});
