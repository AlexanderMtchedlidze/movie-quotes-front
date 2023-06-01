import axios from '@/config/axios/api'

export const login = (credentials) => axios.post('/login', credentials)

export const logout = () => axios.post('/logout')

export const register = (credentials) => axios.post('/register', credentials)

export const getUser = () => axios.get('/user')

export const csrfCookie = (credentials) => axios.get('/csrf-cookie', credentials)
