import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getUser } from '@/services/axios/auth'
import { login, logout, register, csrfCookie } from '@/services/axios/auth'

import { useLoginDialogVisibility } from '../login'

import router from '@/router'

export const useAuthStore = defineStore('authStore', () => {
  const user = ref(null)
  const isLoggedIn = computed(() => !!user.value)
  
  const loginDialogVisibility = useLoginDialogVisibility()

  const fetchUser = async () => {
    try {
      const { data } = await getUser()
      user.value = data
    } catch (e) {
      console.log('Error during getting authorized user')
    }
  }

  const handleLogin = async (credentials) => {
    await csrfCookie()
    await login(credentials)
    await fetchUser()

    loginDialogVisibility.toggleLoginDialogVisibility()
    await router.push({ name: 'newsFeed' })
  }

  const handleLogout = async () => {
    await logout()
    user.value = null

    await router.push({ name: 'home' })
  }

  const handleRegister = async (credentials) => {
    await csrfCookie()
    await register(credentials)
  }

  return {
    user,
    isLoggedIn,
    fetchUser,
    handleLogin,
    handleLogout,
    handleRegister
  }
})
