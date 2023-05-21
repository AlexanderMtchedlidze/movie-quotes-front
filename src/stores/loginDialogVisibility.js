import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLoginDialogVisibility = defineStore('loginDialogVisibility', () => {
  const isLoginDialogDisplayed = ref(false)

  function toggleLoginDialogVisibility() {
    isLoginDialogDisplayed.value = !isLoginDialogDisplayed.value
  }

  return {
    isLoginDialogDisplayed,
    toggleLoginDialogVisibility
  }
})
