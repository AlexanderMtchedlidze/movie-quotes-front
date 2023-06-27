import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useSignUpDialogVisibility } from '../signup'
import { verifyEmail, sendEmailVerification } from '@/services/axios/verifyEmail'

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
  const email = ref(null)

  const setCredentials = (newId, newHash, newEmail) => {
    id.value = newId
    hash.value = newHash
    email.value = newEmail
  }

  const handleEmailVerification = async () => {
    const response = await verifyEmail(id.value, hash.value, email.value)
    if (!response.data.error) toggleVisibilityWhenUserVerifiedEmailSuccessfully()
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
    setCredentials,
    handleGettingEmailVerification
  }
})
