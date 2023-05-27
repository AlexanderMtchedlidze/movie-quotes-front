import http from '../'
import api from '.'

export const csrfCookie = () => http.get('/sanctum/csrf-cookie')

export const login = (credentials) => http.post('/login', credentials)

export const logout = () => http.post('/logout')

export const register = (credentials) => http.post('/register', credentials)

export const getUser = () => api.get('/user')
