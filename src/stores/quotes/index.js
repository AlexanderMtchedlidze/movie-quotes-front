import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  getAllQuotes,
  likeQuote,
  unlikeQuote,
  commentQuote,
  addQuote,
  filterQuotes,
  deleteQuote,
  getQuote,
  editQuote
} from '@/services/axios/quotes'
import { useAuthStore } from '../auth'
import { useMoviesStore } from '../movies'
import router from '@/router'

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
      quote.value?.id === +quoteId ? quote.value : quotes.value?.find((q) => q.id === +quoteId)
    const {
      data: { likes, likes_count, user_in_likes }
    } = await likeQuote(quoteId)
    specificQuote.likes = likes
    specificQuote.likes_count = likes_count
    return user_in_likes
  }

  const handleUnlikingQuote = async (quoteId) => {
    const specificQuote =
      quote.value?.id === +quoteId ? quote.value : quotes.value?.find((q) => q.id === +quoteId)
    const {
      data: { likes, likes_count, user_in_likes }
    } = await unlikeQuote(quoteId)
    specificQuote.likes = likes
    specificQuote.likes_count = likes_count
    return user_in_likes
  }

  const handleCommentingOnQuote = async (quoteId, comment) => {
    if (comment) {
      const specificQuote =
        quote.value?.id === +quoteId ? quote.value : quotes.value?.find((q) => q.id === quoteId)
      const {
        data: { comments_count }
      } = await commentQuote(quoteId, { comment })

      specificQuote.comments_count = comments_count
    }
  }

  const isUserInQuoteLikes = (quoteId) => {
    const specificQuote =
      quote.value?.id === +quoteId ? quote.value : quotes.value?.find((q) => q.id === quoteId)
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
  }

  const handleFilteringQuotes = async (query, filters, page) => {
    const {
      data: { data }
    } = await filterQuotes(query, filters, page)
    page === 1 ? (quotes.value = data) : (quotes.value = [...quotes.value, ...data])
  }

  const toggleNewQuoteDialogVisibility = () => {
    router.currentRoute.value.name === 'newsFeed'
      ? router.push({ name: 'newQuoteDialog' })
      : router.push({ name: 'newsFeed' })
  }

  const getMovieQuoteIndex = (movieRef, quoteId) => {
    return movieRef.quotes.findIndex((q) => q.id == quoteId)
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
    handleUnlikingQuote,
    isUserInQuoteLikes,
    handleCommentingOnQuote,
    handleAddingNewQuote,
    handleFilteringQuotes,
    toggleNewQuoteDialogVisibility,
    handleDeletingQuote,
    handleGettingQuote,
    quote,
    handleEditingQuote
  }
})
