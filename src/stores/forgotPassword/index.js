import { defineStore } from 'pinia'
import { ref } from 'vue'
import { forgotPassword } from '../../config/axios/forgotPassword'
import { extractForgotPasswordCookie } from './helpers'

export const useForgotPassword = defineStore('forgotPasswordStore', () => {
  const forgotPasswordToken = ref(null)
  const isNoticeDialogVisible = ref(null)

  const handleForgotPassword = async (email) => {
    await forgotPassword(email)
    extractForgotPasswordCookie()
    console.log(forgotPasswordToken.value)
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
