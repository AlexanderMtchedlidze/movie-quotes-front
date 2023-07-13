<script setup>
import { configure } from 'vee-validate'
import { RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth'
import { onMounted } from 'vue'
import { useQuotesStore } from '@/stores/quotes'
import { useMoviesStore } from '@/stores/movies'
import { useLocalization } from './stores/localization'
import { useNotificationStore } from './stores/notifications'
import instantiatePusher from '@/helpers/instantiatePusher.js'
import customValMessages from './config/vee-validate/messages'

const localizationStore = useLocalization()

const storedLocale = localStorage.getItem('locale')

if (storedLocale) {
  localizationStore.setLocale(storedLocale)
}

configure({
  ...customValMessages,
  validateOnInput: true
})

const authStore = useAuthStore()

const moviesStore = useMoviesStore()

onMounted(async () => {
  await authStore.fetchUser()

  instantiatePusher()

  window.Echo.private(`notifications.${authStore.user?.id}`).listen(
    'NotificationSent',
    ({ notification, notificationCount }) => {
      const notificationStore = useNotificationStore()
      notificationStore.notificationsRef.unshift(notification)
      notificationStore.notificationsCount = notificationCount
    }
  )

  const quotesStore = useQuotesStore()
  window.Echo.channel('updateQuoteComments').listen(
    'UpdateQuoteComments',
    ({ quoteId, comment, commentsCount }) => {
      let quote
      quotesStore.quote?.id === quoteId
        ? (quote = quotesStore.quote)
        : (quote = quotesStore.quotes.find((q) => q.id === quoteId))
      quote.comments_count = commentsCount
      quote.comments.push(comment)
      if (moviesStore.movieRef)
        moviesStore.movieRef.quotes.find((q) => +q.id === +quoteId).comments_count = commentsCount
    }
  )

  window.Echo.channel('updateLikeCount').listen('UpdateLikeCount', ({ quoteId, likeCount }) => {
    quotesStore.quote?.id === quoteId
      ? (quotesStore.quote.likes_count = likeCount)
      : (quotesStore.quotes.find((q) => q.id === quoteId).likes_count = likeCount)
    if (moviesStore.movieRef)
      moviesStore.movieRef.quotes.find((q) => q.id === quoteId).likes_count = likeCount
  })
})
</script>

<template>
  <div :class="localizationStore.mediumFontClass">
    <RouterView />
  </div>
</template>
