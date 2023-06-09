import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { updateUser } from '@/services/axios/profile'

export const useProfileStore = defineStore('profileStore', () => {
  const authStore = useAuthStore()

  const profileImage = ref(null)

  const username = ref('')
  const usernameInputVisibility = ref(false)

  const toggleUsernameInputVisibility = () => {
    usernameInputVisibility.value = !usernameInputVisibility.value
  }

  const email = ref('')
  const emailInputVisibility = ref(false)

  const toggleEmailInputVisibility = () => {
    emailInputVisibility.value = !emailInputVisibility.value
  }

  const password = ref('')
  const passwordConfirmation = ref('')

  const passwordInputsVisibility = ref(false)

  const togglePasswordInputsVisibility = () => {
    passwordInputsVisibility.value = !passwordInputsVisibility.value
  }

  const saveChangesButtonVisibility = computed(
    () => username.value || email.value || (password.value && passwordConfirmation.value)
  )

  const handleUpdatingUser = async (userData) => {
    await updateUser(userData)
    await authStore.fetchUser()
    clearValues()
  }

  const clearValues = () => {
    usernameInputVisibility.value = false
    emailInputVisibility.value = false
    passwordInputsVisibility.value = false

    username.value = ''
    email.value = ''
    password.value = ''
    passwordConfirmation.value = ''
  }

  return {
    profileImage,
    username,
    usernameInputVisibility,
    toggleUsernameInputVisibility,
    email,
    emailInputVisibility,
    toggleEmailInputVisibility,
    password,
    passwordConfirmation,
    passwordInputsVisibility,
    togglePasswordInputsVisibility,
    saveChangesButtonVisibility,
    handleUpdatingUser,
    clearValues
  }
})
