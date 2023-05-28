import { defineStore } from 'pinia'
import { ref } from 'vue'
import { forgotPassword } from '../../config/axios/forgotPassword'
import { useLoginDialogVisibility } from '../login/loginDialogVisibility'

export const useForgotPassword = defineStore('forgotPasswordStore', () => {
  const forgotPasswordToken = ref(null)
  const userEmail = ref(null)

  const setCredentials = (token, email) => {
    forgotPasswordToken.value = token
    userEmail.value = email
  }

  const handleForgotPassword = async (email) => {
    await forgotPassword(email)
  }

  const isForgotPasswordDialogVisible = ref(false)

  const loginStore = useLoginDialogVisibility()

  const toggleForgotPasswordDialogVisibility = () => {
    loginStore.isLoginDialogDisplayed = false
    isForgotPasswordDialogVisible.value = !isForgotPasswordDialogVisible.value
  }

  const isDisplayedWhenUserSentRecoveryRequest = ref(false)
  const toggleVisibilityWhenUserSentRecoveryRequest = () => {
    toggleForgotPasswordDialogVisibility()
    isDisplayedWhenUserSentRecoveryRequest.value = !isDisplayedWhenUserSentRecoveryRequest.value
  }

  return {
    forgotPasswordToken,
    setCredentials,
    handleForgotPassword,
    isForgotPasswordDialogVisible,
    toggleForgotPasswordDialogVisibility,
    isDisplayedWhenUserSentRecoveryRequest,
    toggleVisibilityWhenUserSentRecoveryRequest
  }
})
