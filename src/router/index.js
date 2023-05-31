import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { fetchUser } from '../stores/auth/helpers'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

router.beforeEach(async () => {
  // if (to.meta.auth) {
  //   try {
  //     await fetchUser()
  //   } catch {
  //     next({ name: 'home' })
  //   }
  //   next()
  // }
  // next()
})

export default router
