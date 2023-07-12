import { defineStore } from 'pinia'
import { resetPassword } from '@/services/axios/resetPassword'
import router from '@/router'

export const useResetPassword = defineStore('resetPasswordStore', () => {
  function toggleResetPasswordDialogVisibility() {
    router.push({ name: 'reset-password' })
  }

  function toggleResetPasswordSuccessDialogVisibility() {
    router.push({ name: 'reset-password-success' })
  }

  const handleResetPassword = async (credentials) => {
    await resetPassword(credentials)
  }

  return {
    toggleResetPasswordDialogVisibility,
    toggleResetPasswordSuccessDialogVisibility,
    handleResetPassword
  }
})
