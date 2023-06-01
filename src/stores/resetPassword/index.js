import { defineStore } from 'pinia'
import { ref } from 'vue'
import { resetPassword } from '@/services/axios/resetPassword'

export const useResetPassword = defineStore('resetPasswordStore', () => {
  const isResetPasswordDialogVisible = ref(false)

  function toggleResetPasswordDialogVisibility() {
    isResetPasswordDialogVisible.value = !isResetPasswordDialogVisible.value
  }

  const isResetPasswordSuccessDialogVisible = ref(false)

  function toggleResetPasswordSuccessDialogVisibility() {
    isResetPasswordSuccessDialogVisible.value = !isResetPasswordSuccessDialogVisible.value
    isResetPasswordDialogVisible.value = false
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
