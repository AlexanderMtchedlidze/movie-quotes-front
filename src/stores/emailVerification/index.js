import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useSignUpDialogVisibility } from '../signup'
import { sendEmailVerification } from '@/services/axios/verifyEmail'
import axios from 'axios'
import { useToken } from '../token'

export const useEmailVerification = defineStore('emailVerificationStore', () => {
  const isDisplayedWhenUserRegistered = ref(false)
  const signUpDialogVisibility = useSignUpDialogVisibility()

  const toggleVisibilityWhenUserRegistered = () => {
    isDisplayedWhenUserRegistered.value = !isDisplayedWhenUserRegistered.value
    signUpDialogVisibility.isSignUpDialogDisplayed = false
  }

  const isDisplayedWhenEmailVerificationWasSuccessful = ref(false)

  const toggleVisibilityWhenUserVerifiedEmailSuccessfully = () => {
    isDisplayedWhenEmailVerificationWasSuccessful.value =
      !isDisplayedWhenEmailVerificationWasSuccessful.value
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
    isDisplayedWhenUserRegistered,
    toggleVisibilityWhenUserRegistered,
    isDisplayedWhenEmailVerificationWasSuccessful,
    toggleVisibilityWhenUserVerifiedEmailSuccessfully,
    handleEmailVerification,
    setEmail,
    handleGettingEmailVerification
  }
})
