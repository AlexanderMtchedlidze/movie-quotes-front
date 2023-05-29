import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useLoginDialogVisibility } from '../login/loginDialogVisibility'
import { useForgotPassword } from '../forgotPassword'

export const useSignUpDialogVisibility = defineStore('signUpDialogVisibility', () => {
  const isSignUpDialogDisplayed = ref(false)

  const login = useLoginDialogVisibility()
  const forgotPassword = useForgotPassword()

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
