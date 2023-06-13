import axios from '@/config/axios/api'

export const getAllGenres = () => axios.get(`/genres`)
