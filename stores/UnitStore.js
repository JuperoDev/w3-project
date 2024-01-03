import { defineStore } from "pinia";

export const useUnitStore = defineStore("test", {
  state: () => ({
    message: "hello",
    elements: [], // Original array to store elements
    info: [{parentUnit:"termagants","unitUrl":"xenos/tyranids/termagants"}], // Array to store objects with "element," "parentUnit," and "unitURL"
  }),

  // Action to add or remove elements
  actions: {
    addOrRemoveElement(elementName, isAdd) {
      if (isAdd) {
        // Check if the elementName is not already in the info array
        if (!this.isElementInInfo(elementName)) {
          this.elements.push(elementName); // Add to original elements array
          this.info.push({ element: elementName, parentUnit: elementName, unitURL: "" });
        }
      } else {
        const index = this.info.findIndex((item) => item.parentUnit === elementName);
        if (index !== -1) {
          this.info.splice(index, 1);
          const elementIndex = this.elements.indexOf(elementName);
          if (elementIndex !== -1) {
            this.elements.splice(elementIndex, 1);
          }
        }
      }
    },
  },
  getters: {
    isElementInList: (state) => (elementName) => {
      return state.info.some((item) => item.parentUnit === elementName);
    },
  },
  persist: true,
});
