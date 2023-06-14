import axios from '@/config/axios/api'

export const getAllMovies = () => axios.get('/movies')

export const getUserMovies = (userId) => axios.get(`/movies/${userId}`)

export const filterMovies = (query) => axios.get(`/movies/search/${query}`)

export const addMovie = (movieData) => axios.post('/movies/add', movieData)

export const getMovie = (movieId) => axios.get(`movie/${movieId}`)
