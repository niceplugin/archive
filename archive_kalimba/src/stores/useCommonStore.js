import { defineStore } from 'pinia'

export const useCommonStore = defineStore('common', {
  state: () => ({
    loaded: false,
  })
})