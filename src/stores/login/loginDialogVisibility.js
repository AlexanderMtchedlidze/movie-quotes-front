import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useForgotPasswordDialogVisibility } from './forgotPasswordDialogVisibility'

export const useLoginDialogVisibility = defineStore('loginDialogVisibility', () => {
  const isLoginDialogDisplayed = ref(false)

  const forgotPassword = useForgotPasswordDialogVisibility()
  function toggleLoginDialogVisibility() {
    isLoginDialogDisplayed.value = !isLoginDialogDisplayed.value
    forgotPassword.isForgotPasswordDialogVisible = false
  }

  return {
    isLoginDialogDisplayed,
    toggleLoginDialogVisibility
  }
})
