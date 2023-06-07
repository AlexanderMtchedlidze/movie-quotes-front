import { defineStore } from 'pinia'
import { ref, computed, reactive } from 'vue'
import { useAuthStore } from '@/stores/auth'

export const useProfileStore = defineStore('profileStore', () => {
  const form = reactive({
    profile_image: null
  })

  const authStore = useAuthStore()

  const username = ref(authStore.user.name)
  const newUsername = ref('')

  const newUsernameInputVisibility = ref(false)

  const toggleNewUsernameInputVisibility = () => {
    newUsernameInputVisibility.value = !newUsernameInputVisibility.value
  }

  const email = ref(authStore.user.email)
  const newEmail = ref('')

  const newEmailInputVisibility = ref(false)

  const toggleNewEmailInputVisibility = () => {
    newEmailInputVisibility.value = !newEmailInputVisibility.value
  }

  const newPassword = ref('')
  const confirmNewPassword = ref('')

  const newPasswordInputVisibility = ref(false)

  const toggleNewPasswordInputVisibility = () => {
    newPasswordInputVisibility.value = !newPasswordInputVisibility.value
  }

  const saveChangesButtonVisibility = computed(
    () => newUsername.value || newEmail.value || newPassword.value || confirmNewPassword.value
  )

  return {
    form,
    username,
    newUsername,
    newUsernameInputVisibility,
    toggleNewUsernameInputVisibility,
    email,
    newEmail,
    newEmailInputVisibility,
    toggleNewEmailInputVisibility,
    newPassword,
    confirmNewPassword,
    newPasswordInputVisibility,
    toggleNewPasswordInputVisibility,
    saveChangesButtonVisibility
  }
})
