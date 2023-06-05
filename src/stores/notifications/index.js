import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNotificationStore = defineStore('notificationStore', () => {
  const isNotificationPanelVisible = ref(false)

  const toggleNotificationPanelVisibility = () => {
    isNotificationPanelVisible.value = !isNotificationPanelVisible.value
  }

  return {
    isNotificationPanelVisible,
    toggleNotificationPanelVisibility
  }
})
