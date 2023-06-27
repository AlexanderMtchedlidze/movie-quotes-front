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
  async function resendEmailVerification(email) {
    isEmailExpiredDialogVisible.value = false
    emailVerificationStore.toggleVisibilityWhenUserRegistered()
    await emailVerificationStore.handleGettingEmailVerification(email)
  }

  function togglePasswordExpiredDialogVisibility() {
    isPasswordExpiredDialogVisible.value = !isPasswordExpiredDialogVisible.value
  }

  const forgotPasswordStore = useForgotPassword()
  async function resendPasswordEmailVerification() {
    isPasswordExpiredDialogVisible.value = false
    forgotPasswordStore.toggleVisibilityWhenUserSentRecoveryRequest()
    await forgotPasswordStore.handleForgotPassword({ email: forgotPasswordStore.userEmail })
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
