import { defineStore } from 'pinia'
import { useQuotesStore } from '@/stores/quotes'
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

  const sendSearchQuery = async () => {
    let query = searchQuery.value
    const prefix = query[0]

    if (isSearchingQuote(prefix) || isSearchingMovie(prefix)) {
      query = query.slice(1)

      if (query.length > 0) {
        const filters = isSearchingQuote(prefix) ? 'quotes' : 'movies'

        router.push({ ...router.currentRoute, query: { filters } })
        await quotesStore.handleFilteringQuotes(
          query,
          filters,
          isSearchingQuote(prefix) ? quotesSearchPage.value : moviesSearchPage.value
        )
      }
    } else {
      await quotesStore.handleGettingAllQuotes()
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
