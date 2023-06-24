import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useToken = defineStore('useTokenStore', () => {
  const isTokenExpiredDialogVisible = ref(false)

  function toggleTokenExpiredDialogVisibility() {
    isTokenExpiredDialogVisible.value = !isTokenExpiredDialogVisible.value
  }

  return {
    isTokenExpiredDialogVisible,
    toggleTokenExpiredDialogVisibility,
  }
})
