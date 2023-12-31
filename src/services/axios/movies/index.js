import axios from '@/config/axios/api'

export const getAllMovies = () => axios.get('/movies')

export const getUserMovies = (userId) => axios.get(`/movies/${userId}`)

export const addMovie = (movieData) => axios.post('/movies/add', movieData)

export const getMovie = (movieId) => axios.get(`/movie/${movieId}`)

export const deleteMovie = (movieId) => axios.post(`/movie/${movieId}/delete`)

export const editMovie = (movieId, movieData) => axios.post(`/movie/${movieId}/edit`, movieData)
