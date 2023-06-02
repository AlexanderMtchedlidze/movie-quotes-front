import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { user, fetchUser } from '../stores/auth/helpers'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

router.beforeEach(async (to, _, next) => {
  await fetchUser()
  if (to.meta.guest && !user.value) {
    next(true)
  } else if (to.meta.auth && user.value) {
    next(true)
  } else if (to.meta.auth && !user.value) {
    next({ name: 'home' })
  } else if (to.meta.guest && user.value) {
    next({ name: 'newsFeed' })
  }
})

export default router
