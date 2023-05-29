import axiosInstance from '../'

export const resetPassword = (credentials) => axiosInstance.post('/reset-password', credentials)
