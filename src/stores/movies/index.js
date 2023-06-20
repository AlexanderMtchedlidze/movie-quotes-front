import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from '../auth'
import { useGenresStore } from '../genres'
import {
  getAllMovies,
  getUserMovies,
  filterMovies,
  addMovie,
  getMovie,
  deleteMovie,
  editMovie
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
  const userMoviesCount = ref(null)

  const authStore = useAuthStore()
  const handleGettingUserMovies = async () => {
    const {
      data: { movies, count }
    } = await getUserMovies(authStore.user.id)
    ;(userMovies.value = movies), (userMoviesCount.value = count)
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
      data: { movie, count }
    } = await addMovie(movieData)
    userMovies.value.unshift(movie)
    userMoviesCount.value = count
    toggleNewMovieDialogVisibility()
  }

  const handleEditingMovie = async (movieId, movieData) => {
    const {
      data: { movie }
    } = await editMovie(movieId, movieData)

    if (movieRef.value.id === movie.id) movieRef.value = movie
  }

  const handleDeletingMovie = async (movieId) => {
    await deleteMovie(movieId)
  }

  const newQuoteDialogVisibility = ref(false)
  const toggleNewQuoteDialogVisibility = () => {
    newQuoteDialogVisibility.value = !newQuoteDialogVisibility.value
  }

  return {
    newMovieDialogVisibility,
    toggleNewMovieDialogVisibility,
    movies,
    handleGettingAllMovies,
    userMovies,
    userMoviesCount,
    movieRef,
    handleGettingMovie,
    handleFilteringMovies,
    handleGettingUserMovies,
    handleAddingMovie,
    handleDeletingMovie,
    newQuoteDialogVisibility,
    toggleNewQuoteDialogVisibility,
    handleEditingMovie
  }
})
