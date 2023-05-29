import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useForgotPassword } from '../forgotPassword'
import { useResetPassword } from '../resetPassword'
import { useSignUpDialogVisibility } from '../signup/signUpDialogVisibility'

export const useLoginDialogVisibility = defineStore('loginDialogVisibility', () => {
  const isLoginDialogDisplayed = ref(false)

  const forgotPassword = useForgotPassword()
  const resetPassword = useResetPassword()
  const signup = useSignUpDialogVisibility()

  function toggleLoginDialogVisibility() {
    isLoginDialogDisplayed.value = !isLoginDialogDisplayed.value
    forgotPassword.isForgotPasswordDialogVisible = false
    resetPassword.isResetPasswordDialogVisible = false
    signup.isSignUpDialogDisplayed = false
  }

  return {
    isLoginDialogDisplayed,
    toggleLoginDialogVisibility
  }
})
