import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from '../auth'
import { useGenresStore } from '../genres'
import {
  getAllMovies,
  getUserMovies,
  addMovie,
  getMovie,
  deleteMovie,
  editMovie
} from '@/services/axios/movies'
import { useLocalization } from '../localization'
import router from '@/router'

export const useMoviesStore = defineStore('moviesStore', () => {
  const genres = ref([])

  const newMovieDialogVisibility = ref(false)

  const toggleNewMovieDialogVisibility = () => {
    router.push({ name: 'newMovieDialog' })
    genres.value = []
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

  const localizationStore = useLocalization()
  const handleFilteringMovies = (query) => {
    userMovies.value = userMovies.value.filter((m) =>
      m.movie[localizationStore.locale].includes(query)
    )
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

  const toggleNewQuoteDialogVisibility = () => {
    router.currentRoute.value.name === 'newMovieQuoteDialog'
      ? router.push({ name: 'movie' })
      : router.push({ name: 'newMovieQuoteDialog' })
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
    toggleNewQuoteDialogVisibility,
    handleEditingMovie,
    genres
  }
})
