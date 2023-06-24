import { defineStore } from 'pinia'
import { ref } from 'vue'
import { resetPassword } from '@/services/axios/resetPassword'
import { useToken } from '../token'

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
    try {
      await resetPassword(credentials)
    } catch (e) {
      if (e.status === 419) {
        const tokenStore = useToken()
        tokenStore.toggleTokenExpiredDialogVisibility()
      }
    }
  }

  return {
    isResetPasswordDialogVisible,
    toggleResetPasswordDialogVisibility,
    isResetPasswordSuccessDialogVisible,
    toggleResetPasswordSuccessDialogVisibility,
    handleResetPassword
  }
})
