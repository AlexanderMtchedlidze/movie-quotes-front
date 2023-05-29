import axiosInstance from '../'

export const forgotPassword = (email) => axiosInstance.post('/forgot-password', email)
