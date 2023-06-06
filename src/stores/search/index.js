import { defineStore } from 'pinia'
import { useQuotesStore } from '@/stores/quotes'
import { ref } from 'vue'

export const useSearchStore = defineStore('searchStore', () => {
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
        await quotesStore.handleFilteringQuotes(
          query,
          isSearchingQuote(prefix) ? 'quotes' : 'movies'
        )
      }
    } else {
      await quotesStore.handleGettingAllQuotes()
    }
    hideSearchPanel()
  }

  return {
    isSearchPanelVisible,
    toggleSearchPanelVisibility,
    hideSearchPanel,
    searchQuery,
    sendSearchQuery
  }
})
