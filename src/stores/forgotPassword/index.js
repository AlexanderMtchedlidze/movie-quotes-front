import { ref } from 'vue'
import { useToken } from '../token'
import { defineStore } from 'pinia'
import { useResetPassword } from '../resetPassword'
import { forgotPassword } from '@/services/axios/forgotPassword'
import axios from 'axios'
import router from '@/router'

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

  const toggleForgotPasswordDialogVisibility = () => {
    router.push({ name: 'forgotPasswordDialog' })
  }

  const toggleVisibilityWhenUserSentRecoveryRequest = () => {
    router.push({ name: 'forgotPasswordSuccess' })
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
    toggleForgotPasswordDialogVisibility,
    toggleVisibilityWhenUserSentRecoveryRequest,
    handleCheckingForgotPasswordExpiration
  }
})
