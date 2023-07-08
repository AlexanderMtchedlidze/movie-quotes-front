import { defineStore } from 'pinia'
import { useQuotesStore } from '@/stores/quotes'
import { useMoviesStore } from '../movies'
import { ref } from 'vue'
import router from '@/router'

export const useSearchStore = defineStore('searchStore', () => {
  const quotesSearchPage = ref(1)
  const moviesSearchPage = ref(1)
  const allSearchPage = ref(1)

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
      if (query.length > 0) {
        let filters = ''
        let page = null

        if (isSearchingQuote(prefix)) {
          filters = 'quotes'
          page = quotesSearchPage.value
          query = query.slice(1)
        } else if (isSearchingMovie(prefix)) {
          filters = 'movies'
          page = moviesSearchPage.value
          query = query.slice(1)
        } else if (isSearchingAll(prefix)) {
          filters = 'all'
          page = allSearchPage.value
        }

        router.push({ ...router.currentRoute, query: { filters } })

        await quotesStore.handleFilteringQuotes(query, filters, page)
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
    sendSearchQuery,
    allSearchPage
  }
})
