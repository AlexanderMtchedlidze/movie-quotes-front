import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { updateUser } from '@/services/axios/profile'

export const useProfileStore = defineStore('profileStore', () => {
  const authStore = useAuthStore()

  const profileImage = ref(null)

  const username = ref('')
  const usernameInputVisibility = ref(false)
  const usernameDialogVisibility = ref(false)

  const toggleUsernameDialogVisibility = () => {
    usernameDialogVisibility.value = !usernameDialogVisibility.value
  }

  const toggleUsernameInputVisibility = () => {
    toggleUsernameDialogVisibility()
    usernameInputVisibility.value = !usernameInputVisibility.value
  }

  const email = ref('')
  const emailInputVisibility = ref(false)
  const emailDialogVisibility = ref(false)

  const toggleEmailDialogVisibility = () => {
    emailDialogVisibility.value = !emailDialogVisibility.value
  }

  const toggleEmailInputVisibility = () => {
    toggleEmailDialogVisibility()
    emailInputVisibility.value = !emailInputVisibility.value
  }

  const password = ref('')
  const passwordConfirmation = ref('')

  const passwordInputsVisibility = ref(false)
  const passwordsDialogVisibility = ref(false)

  const togglePasswordsDialogVisibility = () => {
    passwordsDialogVisibility.value = !passwordsDialogVisibility.value
  }

  const togglePasswordInputsVisibility = () => {
    togglePasswordsDialogVisibility()
    passwordInputsVisibility.value = !passwordInputsVisibility.value
  }

  const saveChangesButtonVisibility = computed(
    () => username.value || email.value || (password.value && passwordConfirmation.value)
  )

  const successMessageVisibility = ref(false)

  const toggleSuccessMessageVisibility = () => {
    successMessageVisibility.value = !successMessageVisibility.value
  }

  const handleUpdatingUser = async () => {
    const formData = new FormData()
    formData.append('profile_image', profileImage.value)
    formData.append('email', email.value)
    formData.append('username', username.value)
    formData.append('password', password.value)
    formData.append('password_confirmation', passwordConfirmation.value)

    await updateUser(formData)
    await authStore.fetchUser()

    toggleSuccessMessageVisibility()
    clearValues()
  }

  const clearValues = () => {
    usernameInputVisibility.value = false
    usernameDialogVisibility.value = false

    emailInputVisibility.value = false
    emailDialogVisibility.value = false

    passwordInputsVisibility.value = false
    passwordsDialogVisibility.value = false

    username.value = ''
    email.value = ''
    password.value = ''
    passwordConfirmation.value = ''
  }

  return {
    profileImage,
    username,
    usernameInputVisibility,
    usernameDialogVisibility,
    toggleUsernameInputVisibility,
    toggleUsernameDialogVisibility,
    email,
    emailInputVisibility,
    emailDialogVisibility,
    toggleEmailInputVisibility,
    toggleEmailDialogVisibility,
    password,
    passwordConfirmation,
    passwordInputsVisibility,
    passwordsDialogVisibility,
    togglePasswordInputsVisibility,
    togglePasswordsDialogVisibility,
    saveChangesButtonVisibility,
    handleUpdatingUser,
    clearValues,
    successMessageVisibility,
    toggleSuccessMessageVisibility
  }
})
