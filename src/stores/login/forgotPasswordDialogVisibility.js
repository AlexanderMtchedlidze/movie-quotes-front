import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useLoginDialogVisibility } from './loginDialogVisibility'
import { useSignUpDialogVisibility } from '../signup/signUpDialogVisibility'

export const useForgotPasswordDialogVisibility = defineStore(
  'forgotPassowrdDialogVisibility',
  () => {
    const isForgotPasswordDialogVisible = ref(false)

    const login = useLoginDialogVisibility()
    const signup = useSignUpDialogVisibility()

    const toggleForgotPasswordDialogVisibility = () => {
      isForgotPasswordDialogVisible.value = !isForgotPasswordDialogVisible.value
      login.isLoginDialogDisplayed = false
      signup.isSignUpDialogDisplayed = false
    }

    return {
      isForgotPasswordDialogVisible,
      toggleForgotPasswordDialogVisibility
    }
  }
)
