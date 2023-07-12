import { defineStore } from 'pinia'
import router from '@/router'

export const useLoginDialogVisibility = defineStore('loginDialogVisibility', () => {
  function toggleLoginDialogVisibility() {
    router.push({ name: 'login' })
  }

  return {
    toggleLoginDialogVisibility
  }
})
