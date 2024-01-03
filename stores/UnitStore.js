import { defineStore } from "pinia";

export const useUnitStore = defineStore("test", {
  state: () => ({
    message: "hello",
    elements: [], // Array to store elements
  }),

  // Action to add or remove elements
  actions: {
    addOrRemoveElement(elementName, isAdd) {
      if (isAdd) {
        // Check if the elementName is not already in the array
        if (!this.elements.includes(elementName)) {
          this.elements.push(elementName);
        }
      } else {
        const index = this.elements.indexOf(elementName);
        if (index !== -1) {
          this.elements.splice(index, 1);
        }
      }
    },
  },
  getters: {
    isElementInList: (state) => (elementName) => {
      return state.elements.includes(elementName);
    },
  },
  persist: true,
});
