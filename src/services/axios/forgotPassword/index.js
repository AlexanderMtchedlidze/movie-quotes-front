import axios from '@/config/axios/api'

export const forgotPassword = (email) => axios.post('/forgot-password', email)
