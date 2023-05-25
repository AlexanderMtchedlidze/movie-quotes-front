import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useLoginDialogVisibility } from '../login/loginDialogVisibility'
import { useForgotPasswordDialogVisibility } from '../login/forgotPasswordDialogVisibility'

export const useSignUpDialogVisibility = defineStore('signUpDialogVisibility', () => {
  const isSignUpDialogDisplayed = ref(false)

  const login = useLoginDialogVisibility()
  const forgotPassword = useForgotPasswordDialogVisibility()

  function toggleSignUpDialogVisibility() {
    isSignUpDialogDisplayed.value = !isSignUpDialogDisplayed.value
    login.isLoginDialogDisplayed = false
    forgotPassword.isForgotPasswordDialogVisible = false
  }

  return {
    isSignUpDialogDisplayed,
    toggleSignUpDialogVisibility
  }
})
