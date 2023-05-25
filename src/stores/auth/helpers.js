import api from '@/config/axios/api'

export const setToken = (token) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export const clearToken = () => {
  delete api.defaults.headers.common['Authorization']
}
