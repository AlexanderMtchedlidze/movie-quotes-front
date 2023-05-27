import router from '.'
import { fetchUser } from '../stores/auth/fetchUser'
import { useEmailVerificationDialogVisibility } from '../stores/signup/emailVerificationDialogVisibility'

const HomeView = () => import('../views/HomeView.vue')

export default [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    beforeEnter: async (to, _, next) => {
      const emailVerificationDialogVisibility = useEmailVerificationDialogVisibility()

      const { email_verification_success } = to.query


      if (email_verification_success) {
        emailVerificationDialogVisibility.toggleVisibilityWhenUserVerifiedEmailSuccessfully()
        router.replace({ ...to, query: {} })
      }

      next()
    }
  }
]
