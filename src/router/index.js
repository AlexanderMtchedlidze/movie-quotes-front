import routes from './routes'
import { useAuthStore } from '../stores/auth'
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

  const authStore = useAuthStore()

  if (!authStore.user) {
    await authStore.fetchUser()
  }

  if (to.meta.auth && !authStore.user?.email_verified_at) {
    next({ name: 'notAuthorized' })
  } else if (to.meta.guest && authStore.user?.email_verified_at && !to.meta.bypassProtection) {
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
