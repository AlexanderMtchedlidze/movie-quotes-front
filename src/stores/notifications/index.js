import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getNotifications, markAllAsRead } from '@/services/axios/notifications'

export const useNotificationStore = defineStore('notificationStore', () => {
  const isNotificationPanelVisible = ref(false)

  const toggleNotificationPanelVisibility = () => {
    isNotificationPanelVisible.value = !isNotificationPanelVisible.value
  }

  const notificationsRef = ref(null)
  const handleGettingAllNotifications = async () => {
    const {
      data: { data }
    } = await getNotifications()
    notificationsRef.value = data
  }

  const handleMarkingAllNotificationsAsRead = async () => {
    const {
      data: { data }
    } = await markAllAsRead()
    notificationsRef.value = data
  }

  return {
    isNotificationPanelVisible,
    toggleNotificationPanelVisibility,
    notificationsRef,
    handleGettingAllNotifications,
    handleMarkingAllNotificationsAsRead
  }
})
