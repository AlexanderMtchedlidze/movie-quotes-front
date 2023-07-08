import { defineStore } from 'pinia'
import { useQuotesStore } from '@/stores/quotes'
import { useMoviesStore } from '../movies'
import { ref } from 'vue'
import router from '@/router'

export const useSearchStore = defineStore('searchStore', () => {
  const quotesSearchPage = ref(1)
  const moviesSearchPage = ref(1)

  const isSearchInputVisible = ref(false)

  const toggleSearchInputVisibility = () => {
    isSearchInputVisible.value = !isSearchInputVisible.value
  }

  const isSearchPanelVisible = ref(false)

  const toggleSearchPanelVisibility = () => {
    isSearchPanelVisible.value = !isSearchPanelVisible.value
  }

  const hideSearchPanel = () => {
    isSearchPanelVisible.value = false
  }

  const quotesStore = useQuotesStore()

  const searchQuery = ref('')

  const isSearchingQuote = (prefix) => prefix === '#'
  const isSearchingMovie = (prefix) => prefix === '@'
  const isSearchingAll = (prefix) => !isSearchingQuote(prefix) && !isSearchingMovie(prefix)

  const moviesStore = useMoviesStore()
  const sendSearchQuery = async () => {
    let query = searchQuery.value
    const prefix = query[0]

    if (router.currentRoute.value.name === 'newsFeed') {
      if (isSearchingQuote(prefix) || isSearchingMovie(prefix) ) query = query.slice(1)

      if (query.length > 0) {
        const filters = isSearchingQuote(prefix) ? 'quotes' : 'movies'

        router.push({ ...router.currentRoute, query: { filters } })

        await quotesStore.handleFilteringQuotes(
          query,
          filters,
          isSearchingQuote(prefix) ? quotesSearchPage.value : moviesSearchPage.value
        )
      } else {
        await quotesStore.handleGettingAllQuotes()
      }
    } else if (router.currentRoute.value.name === 'moviesList') {
      query.length > 0
        ? moviesStore.handleFilteringMovies(query)
        : await moviesStore.handleGettingUserMovies()
    }
    hideSearchPanel()
  }

  return {
    quotesSearchPage,
    moviesSearchPage,
    isSearchInputVisible,
    toggleSearchInputVisibility,
    isSearchPanelVisible,
    toggleSearchPanelVisibility,
    hideSearchPanel,
    searchQuery,
    sendSearchQuery
  }
})
