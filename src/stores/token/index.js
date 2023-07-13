import { defineStore } from 'pinia'
import router from '../../router'
import { useEmailVerification } from '../emailVerification'
import { useForgotPassword } from '../forgotPassword'

export const useToken = defineStore('useTokenStore', () => {
  function toggleEmailExpiredDialogVisibility() {
    router.push({ name: 'emailVerificationLinkExpired' })
  }

  const emailVerificationStore = useEmailVerification()
  async function resendEmailVerification(email) {
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
    toggleEmailExpiredDialogVisibility,
    togglePasswordExpiredDialogVisibility,
    resendEmailVerification,
    resendPasswordEmailVerification
  }
})
