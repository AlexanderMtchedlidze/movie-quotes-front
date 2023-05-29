import { useEmailVerificationDialogVisibility } from '../stores/emailVerification'
import { useForgotPassword } from '../stores/forgotPassword'
import { useResetPassword } from '../stores/resetPassword'
import router from '.'

export const handleBeforeHomeEnter = async (to) => {
  const emailVerificationDialogVisibility = useEmailVerificationDialogVisibility()
  const { email_verification_success } = to.query

  if (email_verification_success) {
    emailVerificationDialogVisibility.toggleVisibilityWhenUserVerifiedEmailSuccessfully()
    router.replace({ ...to, query: {} })
  }

  const forgotPasswordStore = useForgotPassword()
  const resetPasswordStore = useResetPassword()

  const { token, email } = to.query
  if (token && email) {
    forgotPasswordStore.setCredentials(token, email)
    resetPasswordStore.toggleResetPasswordDialogVisibility()
    router.replace({ ...to, query: {} })
  }
}
