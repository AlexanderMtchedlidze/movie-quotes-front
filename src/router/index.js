import routes from './routes'
import { useAuthStore } from '../stores/auth'
import { useForgotPassword } from '../stores/forgotPassword'
import { useEmailVerification } from '../stores/emailVerification'
import { createRouter, createWebHistory } from 'vue-router'
import { useSearchStore } from '../stores/search'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

router.beforeEach(async (to, _, next) => {
  const searchStore = useSearchStore()

  searchStore.isSearchInputVisible = false
  searchStore.searchQuery = ''

  const { email } = to.query

  const authStore = useAuthStore()

  const emailVerification = useEmailVerification()

  emailVerification.setEmail(email)

  if (to.path.includes('/email/verify')) {
    await emailVerification.handleEmailVerification(to)
    router.push({ name: 'home' })
  }

  const forgotPasswordStore = useForgotPassword()

  if (to.path.includes('/forgot-password')) {
    const { email, token } = to.query
    forgotPasswordStore.setCredentials(token, email)
    await forgotPasswordStore.handleCheckingForgotPasswordExpiration(to)
    router.push({ name: 'home' })
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
  } else {
    next()
  }
})

export default router
