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
  if (to.meta.guest && !authStore.user) {
    next()
  } else if (to.meta.auth && authStore.user) {
    next()
  } else if (to.meta.auth && !authStore.user) {
    next({ name: 'home' })
  } else if (to.meta.guest && authStore.user) {
    next({ name: 'newsFeed' })
  }
})

export default router
