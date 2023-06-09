import axios from '@/config/axios/api'

export const updateUser = (userData) => axios.post(`/user/update`, userData)
