import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useSignUpDialogVisibility } from './signUpDialogVisibility'

export const useEmailVerificationDialogVisibility = defineStore(
  'emailVerificationDialogVisibilityStore',
  () => {
    const isDisplayedWhenUserRegistered = ref(false)
    const isDisplayedWhenEmailVerificationWasSuccessful = ref(false)

    const signUpDialogVisibility = useSignUpDialogVisibility()
    const toggleVisibilityWhenUserRegistered = () => {
      isDisplayedWhenUserRegistered.value = !isDisplayedWhenUserRegistered.value
      signUpDialogVisibility.isSignUpDialogDisplayed = false
    }

    const toggleVisibilityWhenUserVerifiedEmailSuccessfully = () => {
      isDisplayedWhenEmailVerificationWasSuccessful.value = true
    }

    return {
      isDisplayedWhenUserRegistered,
      toggleVisibilityWhenUserRegistered,
      isDisplayedWhenEmailVerificationWasSuccessful,
      toggleVisibilityWhenUserVerifiedEmailSuccessfully
    }
  }
)
