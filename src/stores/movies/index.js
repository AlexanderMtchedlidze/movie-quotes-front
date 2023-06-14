import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from '../auth'
import { useGenresStore } from '../genres'
import {
  getAllMovies,
  getUserMovies,
  filterMovies,
  addMovie,
  getMovie
} from '@/services/axios/movies'

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

  const movieRef = ref(null)
  const handleGettingMovie = async (movieId) => {
    const {
      data: { movie }
    } = await getMovie(movieId)
    movieRef.value = movie
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

  const genresStore = useGenresStore()
  const handleAddingMovie = async (movieData) => {
    genresStore.selectedGenres = []
    const {
      data: { movie }
    } = await addMovie(movieData)
    userMovies.value.unshift(movie)
    toggleNewMovieDialogVisibility()
  }

  return {
    newMovieDialogVisibility,
    toggleNewMovieDialogVisibility,
    movies,
    handleGettingAllMovies,
    userMovies,
    movieRef,
    handleGettingMovie,
    handleFilteringMovies,
    handleGettingUserMovies,
    handleAddingMovie
  }
})
