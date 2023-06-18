import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getAllGenres } from '@/services/axios/genres'

export const useGenresStore = defineStore('genresStore', () => {
  const allGenres = ref(null)

  const handleGettingAllGenres = async () => {
    const {
      data: { data }
    } = await getAllGenres()
    allGenres.value = data
  }

  const genreIndex = (genreId, genres) => genres.findIndex((item) => item.id === genreId)

  const pushGenreToSelectedGenres = (genreText, genreId, genres) => {
    const genre = { id: genreId, genre: genreText }

    const existingGenreIndex = genreIndex(genreId, genres)

    if (existingGenreIndex === -1) {
      genres.push(genre)
    }

    return genres
  }

  const removeGenreFromSelectedGenres = (genreId, genres) => {
    const existingGenreIndex = genreIndex(genreId, genres)
    genres.splice(existingGenreIndex, 1)

    return genres
  }

  return {
    allGenres,
    handleGettingAllGenres,
    pushGenreToSelectedGenres,
    removeGenreFromSelectedGenres
  }
})
