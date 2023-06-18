import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

router.beforeEach(async (to, _, next) => {
  const authStore = useAuthStore()

  await authStore.fetchUser()
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
