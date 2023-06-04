import axios from '@/config/axios/api'

export const getAllQuotes = () => axios.get('/quotes')

export const likeQuote = (quoteId) => axios.post(`/quote/${quoteId}/like`)

export const commentQuote = (quoteId, comment) => axios.post(`/quote/${quoteId}/comment`, comment)

export const addQuote = (quoteData) => axios.post('/quote/add', quoteData)

export const filterQuotes = (query, filters) => axios.get(`/search/${filters}/${query}`)
