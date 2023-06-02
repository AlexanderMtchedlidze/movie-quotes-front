import axios from '@/config/axios/api'

export const getAllQuotes = () => axios.get('/quotes')

export const likeQuote = (quoteId) => axios.post(`/quote/${quoteId}/like`)
