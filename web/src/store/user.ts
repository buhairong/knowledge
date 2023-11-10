import { defineStore } from 'pinia'

export const useUserStore = defineStore('users', {
  state: () => ({
    token: ''
  }),
  persist: true
})
