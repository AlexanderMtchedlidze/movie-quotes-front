import { ref } from 'vue'
import { useToken } from '../token'
import { defineStore } from 'pinia'
import { useResetPassword } from '../resetPassword'
import { useLoginDialogVisibility } from '../login'
import { forgotPassword } from '@/services/axios/forgotPassword'
import axios from 'axios'

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

  const handleCheckingForgotPasswordExpiration = async (to) => {
    const url = to.path.replace(import.meta.env.VITE_LOCAL_URL, import.meta.env.VITE_BASE_URL)
    const params = new URLSearchParams()

    for (const key in to.query) {
      params.append(key, to.query[key])
    }

    const modifiedUrl = `${url}?${params.toString()}`
    try {
      await axios.get(import.meta.env.VITE_BASE_URL + modifiedUrl)

      const resetPasswordStore = useResetPassword()

      resetPasswordStore.toggleResetPasswordDialogVisibility()
    } catch (e) {
      if (e.response.status === 403) {
        const tokenStore = useToken()
        tokenStore.togglePasswordExpiredDialogVisibility()
      }
    }
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
