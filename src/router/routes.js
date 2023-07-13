import router from '.'
import { useQuotesStore } from '@/stores/quotes'
import { useMoviesStore } from '@/stores/movies'
import { useEmailVerification } from '../stores/emailVerification'
import { useForgotPassword } from '../stores/forgotPassword'

const HomeView = () => import('../views/HomeView.vue')
const LoginDialog = () => import('../views/dialog/home/LoginDialog.vue')
const SignupDialog = () => import('../views/dialog/home/SignupDialog.vue')
const ForgotPasswordDialog = () => import('../views/dialog/home/ForgotPasswordDialog.vue')
const forgotPasswordSuccessDialog = () =>
  import('../views/dialog/home/forgotPasswordSuccessDialog.vue')
const ResetPasswordDialog = () => import('../views/dialog/home/ResetPasswordDialog.vue')
const ResetPasswordSuccessDialog = () =>
  import('../views/dialog/home/ResetPasswordSuccessDialog.vue')
const ForgotPasswordLinkExpiredDialog = () =>
  import('../views/dialog/home/ForgotPasswordLinkExpired.vue')
const EmailVerificationLinkExpired = () =>
  import('../views/dialog/home/EmailVerificationLinkExpired.vue')
const EmailVerififactionSuccessDialog = () =>
  import('../views/dialog/home/EmailVerificationSuccessDialog.vue')
const EmailVerififactionDialog = () =>
  import('../views/dialog/home/EmailVerificationDialog.vue')
const NewQuoteDialog = () => import('../views/dialog/NewQuoteDialog.vue')
const NewMovieQuoteDialog = () => import('../views/dialog/NewMovieQuoteDialog.vue')
const NewMovieDialog = () => import('../views/dialog/NewMovieDialog.vue')
const NewsFeedView = () => import('../views/NewsFeedView.vue')
const MoviesListView = () => import('../views/MoviesListView.vue')
const MovieView = () => import('../views/MovieView.vue')
const EditMovieDialog = () => import('../views/dialog/EditMovieDialog.vue')
const QuoteView = () => import('../views/QuoteView.vue')
const EditQuoteDialog = () => import('../views/dialog/EditQuoteDialog.vue')
const ViewQuoteDialog = () => import('../views/dialog/ViewQuoteDialog.vue')
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
        component: ResetPasswordSuccessDialog
      },
      {
        meta: { guest: true },
        name: 'forgotPasswordLinkExpired',
        path: 'forgot-password-link-expired',
        component: ForgotPasswordLinkExpiredDialog
      },
      {
        meta: { guest: true },
        name: 'emailVerification',
        path: 'email-verification',
        component: EmailVerififactionDialog
      },
      {
        meta: { bypassProtection: true },
        name: 'emailVerificationSuccess',
        path: 'email-verification-success',
        component: EmailVerififactionSuccessDialog
      },
      {
        meta: { bypassProtection: true },
        name: 'emailVerificationLinkExpired',
        path: 'email-verification-link-expired',
        component: EmailVerificationLinkExpired
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
      router.push({ name: 'emailVerificationSuccess' })
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

      router.push({ name: 'resetPassword' })
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
    component: MoviesListView,
    children: [
      {
        meta: { auth: true },
        name: 'newMovieDialog',
        path: 'add-movie',
        component: NewMovieDialog
      }
    ]
  },
  {
    meta: { auth: true },
    path: '/movie/:id',
    name: 'movie',
    props: true,
    component: MovieView,
    children: [
      {
        meta: { auth: true },
        name: 'editMovieDialog',
        path: 'edit',
        props: true,
        component: EditMovieDialog
      },
      {
        meta: { auth: true },
        name: 'newMovieQuoteDialog',
        path: 'add-quote',
        props: true,
        component: NewMovieQuoteDialog
      },
      {
        meta: { auth: true },
        name: 'editQuoteDialog',
        path: 'edit-quote/:quoteId',
        props: true,
        component: EditQuoteDialog
      },
      {
        meta: { auth: true },
        name: 'viewQuoteDialog',
        path: 'view-quote/:quoteId',
        props: true,
        component: ViewQuoteDialog
      }
    ],
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
