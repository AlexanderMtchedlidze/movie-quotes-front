import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { fetchUser, user } from '../stores/auth/helpers'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

router.beforeEach(async (to, from) => {
  await fetchUser()
})

export default router
