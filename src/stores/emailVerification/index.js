import { ref } from 'vue'
import { defineStore } from 'pinia'
import { sendEmailVerification } from '@/services/axios/verifyEmail'
import axios from 'axios'
import { useToken } from '../token'
import router from '@/router'

export const useEmailVerification = defineStore('emailVerificationStore', () => {
  const toggleVisibilityWhenUserRegistered = () => {
    router.currentRoute.value.name === 'emailVerification'
      ? router.push({ name: 'home' })
      : router.push({ name: 'emailVerification' })
  }

  const toggleVisibilityWhenUserVerifiedEmailSuccessfully = () => {
    router.push({ name: 'emailVerificationSuccess' })
  }

  const email = ref(null)

  const setEmail = (newEmail) => {
    email.value = newEmail
  }

  const handleEmailVerification = async (to) => {
    const url = to.path.replace(import.meta.env.VITE_LOCAL_URL, import.meta.env.VITE_BASE_URL)
    const params = new URLSearchParams()

    for (const key in to.query) {
      params.append(key, to.query[key])
    }

    const modifiedUrl = `${url}?${params.toString()}`
    try {
      await axios.get(import.meta.env.VITE_BASE_URL + modifiedUrl)
      toggleVisibilityWhenUserVerifiedEmailSuccessfully()
    } catch (e) {
      console.log(e);
      if (e.response.status === 403) {
        const tokenStore = useToken()
        tokenStore.toggleEmailExpiredDialogVisibility()
      }
    }
  }

  const handleGettingEmailVerification = async () => {
    await sendEmailVerification(email.value)
  }

  return {
    toggleVisibilityWhenUserRegistered,
    toggleVisibilityWhenUserVerifiedEmailSuccessfully,
    handleEmailVerification,
    setEmail,
    handleGettingEmailVerification
  }
})
