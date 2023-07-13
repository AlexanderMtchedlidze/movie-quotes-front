import { defineStore } from 'pinia'
import { ref } from 'vue'
import router from '../../router'
import { useEmailVerification } from '../emailVerification'
import { useForgotPassword } from '../forgotPassword'

export const useToken = defineStore('useTokenStore', () => {
  const isEmailExpiredDialogVisible = ref(false)

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
    router.push({ name: 'forgotPasswordLinkExpired' })
  }

  const forgotPasswordStore = useForgotPassword()
  async function resendPasswordEmailVerification() {
    forgotPasswordStore.toggleVisibilityWhenUserSentRecoveryRequest()
    await forgotPasswordStore.handleForgotPassword({ email: forgotPasswordStore.userEmail })
  }

  return {
    isEmailExpiredDialogVisible,
    toggleEmailExpiredDialogVisibility,
    togglePasswordExpiredDialogVisibility,
    resendEmailVerification,
    resendPasswordEmailVerification
  }
})
