import { defineStore } from 'pinia'
import { resetPassword } from '@/services/axios/resetPassword'
import router from '@/router'

export const useResetPassword = defineStore('resetPasswordStore', () => {
  function toggleResetPasswordDialogVisibility() {
    router.push({ name: 'resetPassword' })
  }

  function toggleResetPasswordSuccessDialogVisibility() {
    router.push({ name: 'resetPasswordSuccess' })
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
