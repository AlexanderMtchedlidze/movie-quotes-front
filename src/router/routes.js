import { useEmailVerificationDialogVisibility } from '../stores/signup/emailVerificationDialogVisibility'
import { useForgotPassword } from '../stores/forgotPassword'
import { useResetPassword } from '../stores/resetPassword'
import router from '.'

const HomeView = () => import('../views/HomeView.vue')

export default [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    beforeEnter: async (to) => {
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
  }
]
