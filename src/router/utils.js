import { useEmailVerification } from '../stores/emailVerification'
import { useForgotPassword } from '../stores/forgotPassword'
import { useResetPassword } from '../stores/resetPassword'
import router from '.'

export const handleBeforeHomeEnter = async (to) => {
  const emailVerification = useEmailVerification()

  const { id, hash } = to.query
  if (id && hash) {
    emailVerification.setIdAndHash(id, hash)
    router.replace({ ...to, query: {} })
    await emailVerification.handleEmailVerification()
  }

  const forgotPasswordStore = useForgotPassword()
  const resetPasswordStore = useResetPassword()

  const { token, email } = to.query
  if (token && email) {
    forgotPasswordStore.setCredentials(token, email)
    router.replace({ ...to, query: {} })
    resetPasswordStore.toggleResetPasswordDialogVisibility()
  }
}
