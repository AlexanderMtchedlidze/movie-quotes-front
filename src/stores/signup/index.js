import { defineStore } from 'pinia'
import router from '@/router'

export const useSignUpDialogVisibility = defineStore('signUpDialogVisibility', () => {
  function toggleSignUpDialogVisibility() {
    router.push({ name: 'signup' })
  }

  return {
    toggleSignUpDialogVisibility
  }
})
