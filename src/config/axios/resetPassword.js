import api from './api'

export const resetPassword = (credentials) => api.post('/reset-password', credentials)
