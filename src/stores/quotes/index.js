import { defineStore } from 'pinia'
import { allQuotes, handleGettingAllQuotes } from './actions'

export const useQuotesStore = defineStore('quotesStore', () => {
  handleGettingAllQuotes()
  const quotes = allQuotes

  return {
    quotes
  }
})
