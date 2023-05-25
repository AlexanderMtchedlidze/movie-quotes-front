import { csrfCookie, login, logout, register } from '@/config/axios/api/auth'

import { fetchUser, user } from './fetchUser'

import { setToken, clearToken } from './helpers'

export const handleLogin = async (credentials) => {
  await csrfCookie()

  const { data } = await login(credentials)
  setToken(data.token)

  await fetchUser()
}

export const handleLogout = async () => {
  await logout()
  clearToken()
  user.value = null
}

export const handleRegister = async (credentials) => {
  await register(credentials)
}
