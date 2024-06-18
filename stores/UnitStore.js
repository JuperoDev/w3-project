import { defineStore } from 'pinia';

export const useUnitStore = defineStore('savedUnits', {
  state: () => ({
    elements: [], // Array to store elements
    info: [], // Array to store info (url)
  }),

  actions: {
    initializeStore() {
      const storedElements = localStorage.getItem('elements');
      const storedInfo = localStorage.getItem('info');
      if (storedElements && storedInfo) {
        this.elements = JSON.parse(storedElements);
        this.info = JSON.parse(storedInfo);
        // console.log('Loaded elements and info from local storage:', this.elements, this.info);
      }
    },
    addOrRemoveElement(elementName, isAdd, urlStore) {
      if (isAdd) {
        // Check if the elementName is not already in the array
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
      console.log('Saved elements and info to local storage:', this.elements, this.info);
    },
  },

  getters: {
    isElementInList: (state) => (elementName) => {
      return state.elements.includes(elementName);
    },
  },
});
