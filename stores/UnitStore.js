import { defineStore } from 'pinia'

export const useUnitStore = defineStore('test', {
  state: () => ({
    message: 'hello',
    elements: [], // Array to store elements
  }),
})
