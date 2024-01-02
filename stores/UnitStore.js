import { defineStore } from "pinia";

export const useUnitStore = defineStore("test", {
  state: () => ({
    message: "hello",
    elements: ["Screamer-killer"], // Array to store elements
  }),

  // Action to add or remove elements
  actions: {
    addOrRemoveElement(elementName, isAdd) {
      if (isAdd) {
        this.elements.push(elementName);
      } else {
        const index = this.elements.indexOf(elementName);
        if (index !== -1) {
          this.elements.splice(index, 1);
        }
      }
    },
  },
  persist: true,
});
