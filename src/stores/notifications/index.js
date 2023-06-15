import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  getNotifications,
  markAllAsRead,
  markNotificationAsRead
} from '@/services/axios/notifications'

export const useNotificationStore = defineStore('notificationStore', () => {
  const isNotificationPanelVisible = ref(false)

  const toggleNotificationPanelVisibility = () => {
    isNotificationPanelVisible.value = !isNotificationPanelVisible.value
  }

  const notificationsRef = ref(null)
  const notificationsCount = ref(null)

  const handleGettingAllNotifications = async () => {
    const {
      data: { count, notifications }
    } = await getNotifications()
    notificationsRef.value = notifications
    notificationsCount.value = count
  }

  const handleMarkingAllNotificationsAsRead = async () => {
    const {
      data: { count, notifications }
    } = await markAllAsRead()
    notificationsRef.value = notifications
    notificationsCount.value = count
  }

  const handleMarkingNotificationAsRead = async (notificationId) => {
    const notification = notificationsRef.value.find((n) => n.id == notificationId)
    notification.read = true
    const {
      data: { count }
    } = await markNotificationAsRead(notificationId)
    notificationsCount.value = count
  }

  return {
    isNotificationPanelVisible,
    toggleNotificationPanelVisibility,
    notificationsRef,
    notificationsCount,
    handleGettingAllNotifications,
    handleMarkingAllNotificationsAsRead,
    handleMarkingNotificationAsRead
  }
})
