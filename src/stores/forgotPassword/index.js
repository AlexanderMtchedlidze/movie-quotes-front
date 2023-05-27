import { defineStore } from 'pinia'
import { ref } from 'vue'
import { forgotPassword } from '../../config/axios/forgotPassword'
import { useLoginDialogVisibility } from '../login/loginDialogVisibility'
import extractCookie from '../../utilities/extractCookie'

export const useForgotPassword = defineStore('forgotPasswordStore', () => {
  const forgotPasswordToken = ref(null)

  const setForgotPasswordToken = () => {
    forgotPasswordToken.value = extractCookie('forgot_password_token')
  }

  const handleForgotPassword = async (email) => {
    await forgotPassword(email)
    setForgotPasswordToken()
  }

  const isForgotPasswordDialogVisible = ref(false)

  const loginStore = useLoginDialogVisibility()

  const toggleForgotPasswordDialogVisibility = () => {
    loginStore.isLoginDialogDisplayed = false;
    isForgotPasswordDialogVisible.value = !isForgotPasswordDialogVisible.value
  }

  const isDisplayedWhenUserSentRecoveryRequest = ref(false)
  const toggleVisibilityWhenUserSentRecoveryRequest = () => {
    toggleForgotPasswordDialogVisibility()
    isDisplayedWhenUserSentRecoveryRequest.value = !isDisplayedWhenUserSentRecoveryRequest.value
  }

  return {
    handleForgotPassword,
    isForgotPasswordDialogVisible,
    toggleForgotPasswordDialogVisibility,
    isDisplayedWhenUserSentRecoveryRequest,
    toggleVisibilityWhenUserSentRecoveryRequest
  }
})
