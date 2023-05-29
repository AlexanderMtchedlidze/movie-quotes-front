import axiosInstance from '../'

export const login = (credentials) => axiosInstance.post('/login', credentials)

export const logout = () => axiosInstance.post('/logout')

export const register = (credentials) => axiosInstance.post('/register', credentials)

export const csrfCookie = (credentials) => axiosInstance.get('/sanctum/csrf-cookie', credentials)
