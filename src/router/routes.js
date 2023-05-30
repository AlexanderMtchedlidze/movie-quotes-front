const HomeView = () => import('../views/HomeView.vue')
import { handleBeforeHomeEnter } from './utils'

export default [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    beforeEnter: handleBeforeHomeEnter
  }
]
