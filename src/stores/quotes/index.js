import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getAllQuotes, likeQuote, commentQuote, addQuote } from '@/services/axios/quotes'
import { useAuthStore } from '../auth'

export const useQuotesStore = defineStore('quotesStore', () => {
  const quotes = ref(null)
  const authStore = useAuthStore()

  const handleGettingAllQuotes = async () => {
    const {
      data: { data }
    } = await getAllQuotes()
    quotes.value = data
  }

  const handleLikingQuote = async (quoteId) => {
    const quote = quotes.value.find((q) => q.id === quoteId)
    const {
      data: { likes_count }
    } = await likeQuote(quoteId)
    quote.likes_count = likes_count
  }

  const handleCommentingOnQuote = async (quoteId, form) => {
    const quote = quotes.value.find((q) => q.id === quoteId)
    const {
      data: { comment_id, comments_count }
    } = await commentQuote(quoteId, form)

    quote.comments_count = comments_count

    const newComment = { id: comment_id, comment: form.comment, author: authStore.user }
    quote.comments.push(newComment)
  }

  const handleAddingNewQuote = async (quoteData) => {
    const {
      data: { quote }
    } = await addQuote(quoteData)
    quotes.value.unshift(quote)
    toggleNewQuoteDialogVisibility()
  }

  const isNewQuoteDialogVisible = ref(false)

  const toggleNewQuoteDialogVisibility = () => {
    isNewQuoteDialogVisible.value = !isNewQuoteDialogVisible.value
  }

  return {
    quotes,
    handleGettingAllQuotes,
    handleLikingQuote,
    handleCommentingOnQuote,
    handleAddingNewQuote,
    isNewQuoteDialogVisible,
    toggleNewQuoteDialogVisibility
  }
})
