import { defineStore } from 'pinia'
import { computed } from 'vue'
import { handleLogin, handleLogout, handleRegister } from './actions'
import { user as fetchedUser, fetchUser } from './helpers'

export const useAuthStore = defineStore('authStore', () => {
  const user = fetchedUser
  const isLoggedIn = computed(() => !!user.value)

  return {
    user,
    isLoggedIn,
    fetchUser,
    handleLogin,
    handleLogout,
    handleRegister
  }
})
