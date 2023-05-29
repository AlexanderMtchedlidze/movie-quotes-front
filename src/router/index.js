import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useForgotPassword } from '../stores/forgotPassword'
import { useResetPassword } from '../stores/resetPassword'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      beforeEnter: (to) => {
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
})

export default router
