import axios from '@/config/axios/api'

export const getAllMovies = () => axios.get('/movies')
