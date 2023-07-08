<script setup>
import { useToken } from '@/stores/token'
import { useRoute } from 'vue-router'
import { configure } from 'vee-validate'
import { RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth'
import { onMounted, ref, defineAsyncComponent } from 'vue'
import { useQuotesStore } from '@/stores/quotes'
import { useMoviesStore } from '@/stores/movies'
import { useLocalization } from './stores/localization'
import { useNotificationStore } from './stores/notifications'
import instantiatePusher from '@/helpers/instantiatePusher.js'
import customValMessages from './config/vee-validate/messages'

const localizationStore = useLocalization()

const storedLocale = localStorage.getItem('locale')

const tokenStore = useToken()

const route = useRoute()

const topRef = ref(null)

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
  route.name === 'home' ? (topRef.value = '20') : (topRef.value = '24')

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
      if (moviesStore.movieRef) quote = moviesStore.movieRef.quotes.find((q) => q.id === quoteId)
      quote.comments_count = commentsCount
      quote.comments.push(comment)
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

const DialogsBundle = defineAsyncComponent(() =>
  import('@/components/dialog/home/DialogsBundle.vue')
)
</script>

<template>
  <DialogsBundle />

  <BaseStatusDialog
    :title="$t('token.link_expired')"
    :img-alt="$t('alts.icons_expired_icon')"
    img-src="/icons_expired.svg"
    :show="tokenStore.isEmailExpiredDialogVisible"
    @close="tokenStore.toggleEmailExpiredDialogVisibility"
    :top="topRef"
  >
    <p class="mt-8 mb-6">{{ $t('token.email_link_has_expired') }}</p>
    <ActionButton type="primary" @click="tokenStore.resendEmailVerification">{{
      $t('token.request_another_link')
    }}</ActionButton>
  </BaseStatusDialog>

  <BaseStatusDialog
    :title="$t('token.link_expired')"
    :img-alt="$t('alts.icons_expired_icon')"
    img-src="/icons_expired.svg"
    :show="tokenStore.isPasswordExpiredDialogVisible"
    @close="tokenStore.togglePasswordExpiredDialogVisibility"
    :top="topRef"
  >
    <p class="mt-8 mb-6">{{ $t('token.forgot_password_link_has_expired') }}</p>
    <ActionButton type="primary" @click="tokenStore.resendPasswordEmailVerification">{{
      $t('token.request_another_link')
    }}</ActionButton>
  </BaseStatusDialog>

  <div :class="localizationStore.mediumFontClass">
    <RouterView />
  </div>
</template>
