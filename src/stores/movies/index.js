import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from '../auth'
import { getAllMovies, getUserMovies, filterMovies } from '@/services/axios/movies'

export const useMoviesStore = defineStore('moviesStore', () => {
  const newMovieDialogVisibility = ref(false)

  const toggleNewMovieDialogVisibility = () => {
    newMovieDialogVisibility.value = !newMovieDialogVisibility.value
  }

  const movies = ref(null)
  const handleGettingAllMovies = async () => {
    const {
      data: { data }
    } = await getAllMovies()
    movies.value = data
  }

  const userMovies = ref(null)
  const authStore = useAuthStore()
  const handleGettingUserMovies = async () => {
    const {
      data: { data }
    } = await getUserMovies(authStore.user.id)
    userMovies.value = data
  }

  const handleFilteringMovies = async (query) => {
    const {
      data: { data }
    } = await filterMovies(query)
    userMovies.value = data
  }

  return {
    newMovieDialogVisibility,
    toggleNewMovieDialogVisibility,
    movies,
    handleGettingAllMovies,
    userMovies,
    handleFilteringMovies,
    handleGettingUserMovies
  }
})
