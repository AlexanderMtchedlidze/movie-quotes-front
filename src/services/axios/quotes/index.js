import axios from '@/config/axios/api'

export const getAllQuotes = (page) => axios.get(`/quotes?page=${page}`)

export const likeQuote = (quoteId) => axios.post(`/quote/${quoteId}/like`)

export const commentQuote = (quoteId, comment) => axios.post(`/quote/${quoteId}/comment`, comment)

export const addQuote = (quoteData) => axios.post('/quote/add', quoteData)

export const filterQuotes = (query, filters, page) =>
  axios.get(`/search/${filters}/${query}?page=${page}`)

export const deleteQuote = (quoteId) => axios.post(`quote/${quoteId}/delete`)
