import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  getAllQuotes,
  likeQuote,
  commentQuote,
  addQuote,
  filterQuotes,
  deleteQuote,
  getQuote,
  editQuote
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

  const quote = ref(null)
  const handleGettingQuote = async (quoteId) => {
    const searchedQuote = quotes.value?.find((q) => q.id === quoteId)
    if (searchedQuote) {
      quote.value = searchedQuote
    } else {
      const {
        data: { data }
      } = await getQuote(quoteId)
      quote.value = data
    }
  }

  const handleLikingQuote = async (quoteId) => {
    const specificQuote =
      quote.value.id === quoteId ? quote.value : quotes.value.find((q) => q.id === quoteId)
    const {
      data: { likes_count, user_in_likes }
    } = await likeQuote(quoteId)
    specificQuote.likes_count = likes_count
    return user_in_likes
  }

  const handleCommentingOnQuote = async (quoteId, form) => {
    const specificQuote =
      quote.value.id === quoteId ? quote.value : quotes.value.find((q) => q.id === quoteId)
    const {
      data: { comment_id, comments_count }
    } = await commentQuote(quoteId, form)

    specificQuote.comments_count = comments_count

    const newComment = { id: comment_id, comment: form.comment, author: authStore.user }
    specificQuote.comments.push(newComment)
  }

  const isUserInQuoteLikes = (quoteId) => {
    const specificQuote =
      quote.value?.id === quoteId ? quote.value : quotes.value?.find((q) => q.id === quoteId)

    return specificQuote?.likes.find((l) => l.user_id === authStore.user.id)
  }

  const moviesStore = useMoviesStore()
  const handleAddingNewQuote = async (quoteData) => {
    const {
      data: { quote, count }
    } = await addQuote(quoteData)

    quotes.value?.unshift(quote)

    if (quote.movie.id === moviesStore.movieRef?.id) {
      moviesStore.movieRef.quotes_count = count
      moviesStore.movieRef.quotes.unshift(quote)
    }

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

  const getMovieQuoteIndex = (movieRef, quoteId) => {
    return movieRef.quotes.findIndex((q) => q.id === quoteId)
  }

  const handleDeletingQuote = async (quoteId) => {
    const {
      data: { count }
    } = await deleteQuote(quoteId)

    const quotes = moviesStore.movieRef.quotes
    const quoteIndex = getMovieQuoteIndex(moviesStore.movieRef, quoteId)

    if (quoteIndex !== -1) {
      quotes.splice(quoteIndex, 1)
      moviesStore.movieRef.quotes_count = count
    }
  }

  const handleEditingQuote = async (quoteId, formData) => {
    const {
      data: { quote }
    } = await editQuote(quoteId, formData)

    const editableQuoteIndex = getMovieQuoteIndex(moviesStore.movieRef, quoteId)

    if (editableQuoteIndex !== -1) {
      moviesStore.movieRef.quotes.splice(editableQuoteIndex, 1, quote)
    }
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
    handleDeletingQuote,
    handleGettingQuote,
    quote,
    handleEditingQuote
  }
})
