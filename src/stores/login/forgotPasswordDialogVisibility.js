import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useLoginDialogVisibility } from './loginDialogVisibility'

export const useForgotPasswordDialogVisibility = defineStore(
  'forgotPassowrdDialogVisibility',
  () => {
    const isForgotPasswordDialogVisible = ref(false)

    const login = useLoginDialogVisibility()
    const toggleForgotPasswordDialogVisibility = () => {
      isForgotPasswordDialogVisible.value = !isForgotPasswordDialogVisible.value
      login.isLoginDialogDisplayed = false
    }

    return {
      isForgotPasswordDialogVisible,
      toggleForgotPasswordDialogVisibility
    }
  }
)
