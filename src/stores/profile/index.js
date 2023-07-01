import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useEmailVerification } from '@/stores/emailVerification'
import { updateUser } from '@/services/axios/profile'

export const useProfileStore = defineStore('profileStore', () => {
  const authStore = useAuthStore()

  const profileImage = ref(null)

  const handleProfileImageChange = (e, handleChange) => {
    profileImage.value = e.target.files[0]
    handleChange(e.target.files[0])
    toggleProfileImageDialogVisibility()
  }

  const profileImageDialogVisibility = ref(false)
  const toggleProfileImageDialogVisibility = () => {
    profileImageDialogVisibility.value = !profileImageDialogVisibility.value
  }

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

  const successMessageVisibility = ref(false)

  const toggleSuccessMessageVisibility = () => {
    successMessageVisibility.value = !successMessageVisibility.value
  }

  const closeAllDialogs = () => {
    profileImageDialogVisibility.value = false
    usernameDialogVisibility.value = false
    emailDialogVisibility.value = false
    passwordsDialogVisibility.value = false
  }

  const handleUpdatingUser = async () => {
    const formData = new FormData()

    if (profileImage.value) {
      formData.append('profile_image', profileImage.value)
    }
    if (email.value) {
      const emailVerification = useEmailVerification()

      emailVerification.toggleVisibilityWhenUserRegistered()

      formData.append('email', email.value)
    }
    if (username.value) {
      formData.append('username', username.value)
    }
    if (password.value) {
      formData.append('password', password.value)
    }
    if (passwordConfirmation.value) {
      formData.append('password_confirmation', passwordConfirmation.value)
    }

    await updateUser(formData)
    await authStore.fetchUser()

    toggleSuccessMessageVisibility()

    clearValues()
  }

  const handleUpdatingProfileImage = async () => {
    const formData = new FormData()
    formData.append('profile_image', profileImage.value)

    await updateUser(formData)
    await authStore.fetchUser()

    toggleSuccessMessageVisibility()

    profileImage.value = ''
  }

  const handleUpdatingUsername = async () => {
    await updateUser({ username: username.value })
    await authStore.fetchUser()

    toggleSuccessMessageVisibility()

    username.value = ''
  }

  const handleUpdatingEmail = async () => {
    await updateUser({ email: email.value })
    await authStore.fetchUser()

    toggleSuccessMessageVisibility()

    email.value = ''
  }

  const handleUpdatingPasswords = async () => {
    await updateUser({
      password: password.value,
      password_confirmation: passwordConfirmation.value
    })
    await authStore.fetchUser()

    toggleSuccessMessageVisibility()

    password.value = ''
    passwordConfirmation.value = ''
  }

  const clearValues = () => {
    usernameInputVisibility.value = false
    usernameDialogVisibility.value = false
    username.value = ''

    emailInputVisibility.value = false
    emailDialogVisibility.value = false
    email.value = ''

    passwordInputsVisibility.value = false
    passwordsDialogVisibility.value = false

    password.value = ''
    passwordConfirmation.value = ''
  }

  return {
    profileImage,
    handleProfileImageChange,
    profileImageDialogVisibility,
    toggleProfileImageDialogVisibility,
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
    handleUpdatingUser,
    clearValues,
    successMessageVisibility,
    toggleSuccessMessageVisibility,
    closeAllDialogs,
    handleUpdatingEmail,
    handleUpdatingProfileImage,
    handleUpdatingUsername,
    handleUpdatingPasswords
  }
})
