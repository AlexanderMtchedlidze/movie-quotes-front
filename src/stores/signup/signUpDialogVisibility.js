import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSignUpDialogVisibility = defineStore('signUpDialogVisibility', () => {
  const isSignUpDialogDisplayed = ref(false)

  function toggleSignUpDialogVisibility() {
    isSignUpDialogDisplayed.value = !isSignUpDialogDisplayed.value
  }

  return {
    isSignUpDialogDisplayed,
    toggleSignUpDialogVisibility
  }
})
