import api from './index.js'

import axiosInstance from '../index.js'

export const csrfCookie = () => axiosInstance.get('/sanctum/csrf-cookie')

export const login = (credentials) => api.post('/login', credentials)

export const logout = () => api.post('/logout')

export const register = (credentials) => api.post('/register', credentials)

export const getUser = () => api.get('/user')
