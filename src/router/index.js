import routes from './routes'
import { useAuthStore } from '../stores/auth'
import { useResetPassword } from '../stores/resetPassword'
import { useForgotPassword } from '../stores/forgotPassword'
import { useEmailVerification } from '../stores/emailVerification'
import { createRouter, createWebHistory } from 'vue-router'
import { useToken } from '../stores/token'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

router.beforeEach(async (to, _, next) => {
  const authStore = useAuthStore()

  const emailVerification = useEmailVerification()

  const { email } = to.query

  const { id, hash } = to.query
  if (id && hash) {
    emailVerification.setIdAndHash(id, hash)
    const response = await emailVerification.handleEmailVerification(email ?? null)
    if (response.status === 419) {
      const tokenStore = useToken()
      tokenStore.toggleTokenExpiredDialogVisibility()
    }
  }

  const forgotPasswordStore = useForgotPassword()
  const resetPasswordStore = useResetPassword()

  const { token } = to.query
  if (token && email) {
    forgotPasswordStore.setCredentials(token, email)
    resetPasswordStore.toggleResetPasswordDialogVisibility()
  }

  if (!authStore.user) {
    await authStore.fetchUser()
  }

  if (to.meta.guest && !authStore.user?.email_verified_at) {
    next()
  } else if (to.meta.auth && authStore.user?.email_verified_at) {
    next()
  } else if (to.meta.auth && !authStore.user?.email_verified_at) {
    next({ name: 'notAuthorized' })
  } else if (to.meta.guest && authStore.user?.email_verified_at) {
    next({ name: 'newsFeed' })
  } else if (to.name === 'notFound') {
    next()
  } else if (to.name === 'notAuthorized' && !authStore.user?.email_verified_at) {
    next()
  }
})

export default router
