import { defineStore } from 'pinia'
import { ref } from 'vue'
import { forgotPassword, isPasswordVerificationExpired } from '@/services/axios/forgotPassword'
import { useLoginDialogVisibility } from '../login'

export const useForgotPassword = defineStore('forgotPasswordStore', () => {
  const token = ref(null)
  const userEmail = ref(null)

  const setCredentials = (forgotPasswordToken, email) => {
    token.value = forgotPasswordToken
    userEmail.value = email
  }

  const handleForgotPassword = async (email) => {
    await forgotPassword(email ?? userEmail.value)
  }

  const isForgotPasswordDialogVisible = ref(false)

  const loginStore = useLoginDialogVisibility()

  const toggleForgotPasswordDialogVisibility = () => {
    loginStore.isLoginDialogDisplayed = false
    isForgotPasswordDialogVisible.value = !isForgotPasswordDialogVisible.value
  }

  const isDisplayedWhenUserSentRecoveryRequest = ref(false)
  const toggleVisibilityWhenUserSentRecoveryRequest = () => {
    isForgotPasswordDialogVisible.value = false
    isDisplayedWhenUserSentRecoveryRequest.value = !isDisplayedWhenUserSentRecoveryRequest.value
  }

  const handleCheckingForgotPasswordExpiration = async () => {
    await isPasswordVerificationExpired()
  }

  return {
    token,
    userEmail,
    setCredentials,
    handleForgotPassword,
    isForgotPasswordDialogVisible,
    toggleForgotPasswordDialogVisibility,
    isDisplayedWhenUserSentRecoveryRequest,
    toggleVisibilityWhenUserSentRecoveryRequest,
    handleCheckingForgotPasswordExpiration
  }
})
