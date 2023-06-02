import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getAllQuotes, likeQuote } from '@/services/axios/quotes'

export const useQuotesStore = defineStore('quotesStore', () => {
  const quotes = ref(null)

  const handleGettingAllQuotes = async () => {
    const {
      data: { data }
    } = await getAllQuotes()
    quotes.value = data
  }

  const handleLikingQuote = async (quoteId) => {
    const quote = quotes.value.find((q) => q.id === quoteId)
    const {
      data: { likes_amount }
    } = await likeQuote(quoteId)
    quote.likes_amount = likes_amount
  }

  return {
    quotes,
    handleGettingAllQuotes,
    handleLikingQuote
  }
})
