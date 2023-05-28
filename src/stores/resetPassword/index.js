import { defineStore } from 'pinia'
import { ref } from 'vue'
import { resetPassword } from '../../config/axios/resetPassword'

export const useResetPassword = defineStore('resetPasswordStore', () => {
  const isResetPasswordDialogVisible = ref(false)

  function toggleResetPasswordDialogVisibility() {
    isResetPasswordDialogVisible.value = !isResetPasswordDialogVisible.value
  }

  const isResetPasswordSuccessDialogVisible = ref(false)

  function toggleResetPasswordSuccessDialogVisibility() {
    toggleResetPasswordDialogVisibility()
    isResetPasswordSuccessDialogVisible.value = !isResetPasswordSuccessDialogVisible.value
  }

  const handleResetPassword = async (credentials) => {
    await resetPassword(credentials)
  }

  return {
    isResetPasswordDialogVisible,
    toggleResetPasswordDialogVisibility,
    isResetPasswordSuccessDialogVisible,
    toggleResetPasswordSuccessDialogVisibility,
    handleResetPassword
  }
})
