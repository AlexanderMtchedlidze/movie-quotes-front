import axios from '@/config/axios/api'

export const resetPassword = (credentials) => axios.post('/reset-password', credentials)
