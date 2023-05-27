import { defineStore } from 'pinia'
import { ref } from 'vue'
import { forgotPassword } from '../../config/axios/forgotPassword'
import extractCookie from '../../utilities/extractCookie'

export const useForgotPassword = defineStore('forgotPasswordStore', () => {
  const forgotPasswordToken = ref(null)
  const isNoticeDialogVisible = ref(null)

  const setForgotPasswordToken = () => {
    forgotPasswordToken.value = extractCookie('forgot_password_token')
  }

  const handleForgotPassword = async (email) => {
    await forgotPassword(email)
    setForgotPasswordToken()
  }

  const toggleNoticeDialogVisibility = () => {
    isNoticeDialogVisible.value = !isNoticeDialogVisible.value
  }

  return {
    forgotPasswordToken,
    handleForgotPassword,
    toggleNoticeDialogVisibility
  }
})
