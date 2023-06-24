<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { configure } from 'vee-validate'
import { useAuthStore } from './stores/auth'
import { useQuotesStore } from '@/stores/quotes'
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
  window.Echo.channel('updateCommentCount').listen(
    'UpdateCommentCount',
    ({ quoteId, commentsCount }) => {
      quotesStore.quote.id === quoteId
        ? (quotesStore.quote.comments_count = commentsCount)
        : (quotesStore.quotes.find((q) => q.id === quoteId).comments_count = commentsCount)
    }
  )

  window.Echo.channel('updateLikeCount').listen('UpdateLikeCount', ({ quoteId, likeCount }) => {
    quotesStore.quote.id === quoteId
      ? (quotesStore.quote.likes_count = likeCount)
      : (quotesStore.quotes.find((q) => q.id === quoteId).likes_count = likeCount)
  })
})
</script>

<template>
  <BaseStatusDialog
    :title="$t('token.link_expired')"
    :img-alt="$t('alts.paper_plane_icon')"
    img-src="/paper-plane.svg"
    :show="emailVerification.isDisplayedWhenUserRegistered"
    @close="emailVerification.toggleVisibilityWhenUserRegistered"
  >
    <p class="mt-4 mb-10 font-medium" v-html="$t('email_verification.notice.check_your_email')"></p>
  </BaseStatusDialog>

  <RouterView />
</template>
