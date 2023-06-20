import axios from '@/config/axios/api'

export const getNotifications = () => axios.get('/notifications')

export const markAllAsRead = () => axios.post('/notifications/mark-all-as-read')

export const markNotificationAsRead = (notificationId) =>
  axios.post(`/notification/${notificationId}/mark-as-read`)
