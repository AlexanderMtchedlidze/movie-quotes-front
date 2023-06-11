import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from '../auth'
import { getAllMovies, getUserMovies } from '@/services/axios/movies'

export const useMoviesStore = defineStore('moviesStore', () => {
  const movies = ref(null)
  const userMovies = ref(null)

  const handleGettingAllMovies = async () => {
    const {
      data: { data }
    } = await getAllMovies()
    movies.value = data
  }

  const authStore = useAuthStore()
  const handleGettingUserMovies = async () => {
    const {
      data: { data }
    } = await getUserMovies(authStore.user.id)
    userMovies.value = data
  }

  return {
    movies,
    handleGettingAllMovies,
    userMovies,
    handleGettingUserMovies
  }
})
