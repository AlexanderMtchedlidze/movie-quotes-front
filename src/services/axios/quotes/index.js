import axios from '@/config/axios/api'

export const getAllQuotes = () => axios.get('/quotes')
