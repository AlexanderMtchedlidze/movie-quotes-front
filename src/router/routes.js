import { handleBeforeHomeEnter } from './utils'

const HomeView = () => import('../views/HomeView.vue')
const NewsFeedView = () => import('../views/NewsFeedView.vue')
const MoviesListView = () => import('../views/MoviesListView.vue')

export default [
  {
    meta: { guest: true },
    path: '/',
    name: 'home',
    component: HomeView,
    beforeEnter: handleBeforeHomeEnter
  },
  {
    meta: { auth: true },
    path: '/news-feed',
    name: 'newsFeed',
    component: NewsFeedView
  },
  {
    meta: { auth: true },
    path: '/movies-list',
    name: 'moviesList',
    component: MoviesListView
  }
]
