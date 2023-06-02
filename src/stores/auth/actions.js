import { login, logout, register, csrfCookie } from '@/services/axios/auth'

import { fetchUser, user } from './helpers'

import router from '@/router'

export const handleLogin = async (credentials) => {
  await csrfCookie()
  await login(credentials)
  await fetchUser()

  await router.push({ name: 'newsFeed' })
}

export const handleLogout = async () => {
  await logout()
  user.value = null
}

export const handleRegister = async (credentials) => {
  await csrfCookie()
  await register(credentials)
}
