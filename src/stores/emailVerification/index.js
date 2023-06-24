import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useSignUpDialogVisibility } from '../signup'
import { verifyEmail } from '@/services/axios/verifyEmail'

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

  const id = ref(null)
  const hash = ref(null)

  const setIdAndHash = (newId, newHash) => {
    id.value = newId
    hash.value = newHash
  }

  const handleEmailVerification = async (email = null) => {
    toggleVisibilityWhenUserVerifiedEmailSuccessfully()
    return await verifyEmail(id.value, hash.value, email)
  }

  return {
    isDisplayedWhenUserRegistered,
    toggleVisibilityWhenUserRegistered,
    isDisplayedWhenEmailVerificationWasSuccessful,
    toggleVisibilityWhenUserVerifiedEmailSuccessfully,
    handleEmailVerification,
    setIdAndHash
  }
})
