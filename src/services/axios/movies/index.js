import axios from '@/config/axios/api'

export const getAllMovies = () => axios.get('/movies')

export const getUserMovies = (userId) => axios.get(`/movies/${userId}`)
