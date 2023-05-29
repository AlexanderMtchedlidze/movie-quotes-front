import api from './api'

export const forgotPassword = (email) => api.post('/forgot-password', email)
