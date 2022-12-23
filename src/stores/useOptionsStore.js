import { defineStore } from 'pinia'

export const useOptionsStore = defineStore('options', {
  state: () => ({
    width: 1.5,
    marginTop: 2,
    gapX: 1,
    gapY: 5,
    base: false,
    show: 'note',
    item: 'kalimba'
  })
})