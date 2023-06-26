import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useEmailVerification } from '../emailVerification'
import { useForgotPassword } from '../forgotPassword'

export const useToken = defineStore('useTokenStore', () => {
  const isEmailExpiredDialogVisible = ref(false)
  const isPasswordExpiredDialogVisible = ref(false)

  function toggleEmailExpiredDialogVisibility() {
    isEmailExpiredDialogVisible.value = !isEmailExpiredDialogVisible.value
  }

  const emailVerificationStore = useEmailVerification()
  async function resendEmailVerification() {
    await emailVerificationStore.handleEmailVerification()
  }

  function togglePasswordExpiredDialogVisibility() {
    isPasswordExpiredDialogVisible.value = !isPasswordExpiredDialogVisible.value
  }

  const forgotPasswordStore = useForgotPassword()
  async function resendPasswordEmailVerification() {
    await forgotPasswordStore.handleForgotPassword()
  }

  return {
    isEmailExpiredDialogVisible,
    toggleEmailExpiredDialogVisibility,
    isPasswordExpiredDialogVisible,
    togglePasswordExpiredDialogVisibility,
    resendEmailVerification,
    resendPasswordEmailVerification
  }
})
