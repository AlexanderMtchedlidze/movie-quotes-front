import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getAllMovies } from '@/services/axios/movies'

export const useMoviesStore = defineStore('moviesStore', () => {
  const movies = ref(null)

  const handleGettingAllMovies = async () => {
    const {
      data: { data }
    } = await getAllMovies()
    movies.value = data
  }

  return {
    movies,
    handleGettingAllMovies
  }
})
