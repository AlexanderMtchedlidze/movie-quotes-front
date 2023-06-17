import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getAllGenres } from '@/services/axios/genres'

export const useGenresStore = defineStore('genresStore', () => {
  const selectedGenres = ref([])
  const allGenres = ref(null)

  const handleGettingAllGenres = async (genres = null) => {
    if (genres) {
      selectedGenres.value = genres
    }

    const {
      data: { data }
    } = await getAllGenres()
    allGenres.value = data
  }

  const genreIndex = (genreId) => selectedGenres.value.findIndex((item) => item.id === genreId)

  const pushGenreToSelectedGenres = (genreText, genreId) => {
    const genre = { id: genreId, genre: genreText }

    const existingGenreIndex = genreIndex(genreId)

    if (existingGenreIndex === -1) {
      selectedGenres.value.push(genre)
    }

    return selectedGenres
  }

  const removeGenreFromSelectedGenres = (genreId) => {
    const existingGenreIndex = genreIndex(genreId)
    selectedGenres.value.splice(existingGenreIndex, 1)

    return selectedGenres
  }

  return {
    selectedGenres,
    allGenres,
    handleGettingAllGenres,
    pushGenreToSelectedGenres,
    removeGenreFromSelectedGenres
  }
})
