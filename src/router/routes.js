import router from '.'
import { useQuotesStore } from '@/stores/quotes'
import { useMoviesStore } from '@/stores/movies'
import { useEmailVerification } from '../stores/emailVerification'
import { useForgotPassword } from '../stores/forgotPassword'

const HomeView = () => import('../views/HomeView.vue')
const LoginDialog = () => import('@/components/dialog/home/LoginDialog.vue')
const SignupDialog = () => import('@/components/dialog/home/SignupDialog.vue')
const ForgotPasswordDialog = () => import('@/components/dialog/home/ForgotPasswordDialog.vue')
const forgotPasswordSuccessDialog = () =>
  import('@/components/dialog/home/forgotPasswordSuccessDialog.vue')
const ResetPasswordDialog = () => import('@/components/dialog/home/ResetPasswordDialog.vue')
const ResetPassworSuccessDialog = () =>
  import('@/components/dialog/home/ResetPassworSuccessDialog.vue')
const NewQuoteDialog = () => import('@/components/dialog/NewQuoteDialog.vue')
const NewsFeedView = () => import('../views/NewsFeedView.vue')
const MoviesListView = () => import('../views/MoviesListView.vue')
const MovieView = () => import('../views/MovieView.vue')
const QuoteView = () => import('../views/QuoteView.vue')
const UserProfileView = () => import('../views/UserProfileView.vue')
const NotFoundView = () => import('../views/NotFoundView.vue')
const NotAuthorized = () => import('../views/NotAuthorizedView.vue')

export default [
  {
    meta: { guest: true },
    path: '/',
    name: 'home',
    component: HomeView,
    children: [
      {
        meta: { guest: true },
        name: 'login',
        path: 'login',
        component: LoginDialog
      },
      {
        meta: { guest: true },
        name: 'signup',
        path: 'signup',
        component: SignupDialog
      },
      {
        meta: { guest: true },
        name: 'forgotPasswordDialog',
        path: 'forgot-password',
        component: ForgotPasswordDialog
      },
      {
        meta: { guest: true },
        name: 'forgotPasswordSuccess',
        path: 'forgot-password-success',
        component: forgotPasswordSuccessDialog
      },
      {
        meta: { guest: true },
        name: 'resetPassword',
        path: 'reset-password',
        component: ResetPasswordDialog
      },
      {
        meta: { guest: true },
        name: 'resetPasswordSuccess',
        path: 'reset-password-success',
        component: ResetPassworSuccessDialog
      }
    ]
  },
  {
    path: '/api/email/verify/:id/:hash',
    name: 'emailVerify',
    component: HomeView,
    beforeEnter: async (to) => {
      const { email } = to.query

      const emailVerification = useEmailVerification()

      emailVerification.setEmail(email)

      await emailVerification.handleEmailVerification(to)
      router.push({ name: 'home', query: { bypassProtection: true } })
    }
  },
  {
    path: '/api/forgot-password',
    name: 'forgotPassword',
    component: HomeView,
    beforeEnter: async (to) => {
      const forgotPasswordStore = useForgotPassword()

      const { email, token } = to.query
      forgotPasswordStore.setCredentials(token, email)
      await forgotPasswordStore.handleCheckingForgotPasswordExpiration(to)

      router.push({ name: 'home' })
    }
  },
  {
    meta: { auth: true },
    path: '/profile',
    name: 'userProfile',
    component: UserProfileView
  },
  {
    meta: { auth: true },
    path: '/news-feed',
    name: 'newsFeed',
    component: NewsFeedView,
    children: [
      {
        meta: { auth: true },
        name: 'newQuoteDialog',
        path: 'post-new-quote',
        component: NewQuoteDialog
      }
    ]
  },
  {
    meta: { auth: true },
    path: '/movies-list',
    name: 'moviesList',
    component: MoviesListView
  },
  {
    meta: { auth: true },
    path: '/movie/:id',
    name: 'movie',
    props: true,
    component: MovieView,
    beforeEnter: async (to) => {
      const movieId = to.params.id

      const moviesStore = useMoviesStore()

      try {
        await moviesStore.handleGettingMovie(movieId)
      } catch (e) {
        router.push({ name: 'notFound', params: { notFound: 'notFound' } })
      }
    }
  },
  {
    meta: { auth: true },
    path: '/quote/:id',
    name: 'quote',
    props: true,
    component: QuoteView,
    beforeEnter: async (to) => {
      const quoteId = to.params.id

      const quotesStore = useQuotesStore()

      try {
        await quotesStore.handleGettingQuote(quoteId)
      } catch (e) {
        router.push({ name: 'notFound', params: { notFound: 'notFound' } })
      }
    }
  },
  { path: '/not-authorized', name: 'notAuthorized', component: NotAuthorized },
  { path: '/:notFound(.*)', name: 'notFound', component: NotFoundView }
]
