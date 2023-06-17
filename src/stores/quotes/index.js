import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  getAllQuotes,
  likeQuote,
  commentQuote,
  addQuote,
  filterQuotes,
  deleteQuote
} from '@/services/axios/quotes'
import { useAuthStore } from '../auth'
import { useMoviesStore } from '../movies'

export const useQuotesStore = defineStore('quotesStore', () => {
  const quotes = ref(null)
  const page = ref(1)
  const authStore = useAuthStore()

  const handleGettingAllQuotes = async () => {
    const {
      data: { data }
    } = await getAllQuotes(page.value)
    page.value === 1 ? (quotes.value = data) : (quotes.value = [...quotes.value, ...data])
  }

  const handleLikingQuote = async (quoteId) => {
    const quote = quotes.value.find((q) => q.id === quoteId)
    const {
      data: { likes_count, user_in_likes }
    } = await likeQuote(quoteId)
    quote.likes_count = likes_count
    return user_in_likes
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

  const isUserInQuoteLikes = (quoteId) => {
    const quote = quotes.value.find((q) => q.id === quoteId)
    return quote.likes.find((l) => l.user_id === authStore.user.id)
  }

  const moviesStore = useMoviesStore()
  const handleAddingNewQuote = async (quoteData) => {
    const {
      data: { quote, movie }
    } = await addQuote(quoteData)

    quotes.value?.unshift(quote)

    const movieIndex = moviesStore.userMovies.find((m) => m.id === movie.id)
    moviesStore.userMovies.splice(movieIndex, 1, movie)

    isNewQuoteDialogVisible.value = false
    moviesStore.newQuoteDialogVisibility = false
  }

  const handleFilteringQuotes = async (query, filters, page) => {
    const {
      data: { data }
    } = await filterQuotes(query, filters, page)
    page === 1 ? (quotes.value = data) : (quotes.value = [...quotes.value, ...data])
  }

  const isNewQuoteDialogVisible = ref(false)

  const toggleNewQuoteDialogVisibility = () => {
    isNewQuoteDialogVisible.value = !isNewQuoteDialogVisible.value
  }

  const handleDeletingQuote = async (quoteId) => {
    await deleteQuote(quoteId)
  }

  return {
    quotes,
    page,
    handleGettingAllQuotes,
    handleLikingQuote,
    isUserInQuoteLikes,
    handleCommentingOnQuote,
    handleAddingNewQuote,
    handleFilteringQuotes,
    isNewQuoteDialogVisible,
    toggleNewQuoteDialogVisibility,
    handleDeletingQuote
  }
})
