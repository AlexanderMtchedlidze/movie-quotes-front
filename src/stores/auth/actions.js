import { csrfCookie, login, logout, register } from '@/config/axios/api/auth'

import { fetchUser, user } from './helpers'

export const handleLogin = async (credentials) => {
  await csrfCookie()
  await login(credentials)
  await fetchUser()
}

export const handleLogout = async () => {
  await logout()
  user.value = null
}

export const handleRegister = async (credentials) => {
  await register(credentials)
}
