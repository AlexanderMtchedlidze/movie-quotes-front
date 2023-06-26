<script setup>
import { useToken } from '@/stores/token'
import { useRoute } from 'vue-router'
import { configure } from 'vee-validate'
import { RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth'
import { onMounted, ref } from 'vue'
import { useQuotesStore } from '@/stores/quotes'
import { useLocalization } from './stores/localization'
import { useNotificationStore } from './stores/notifications'
import instantiatePusher from '@/helpers/instantiatePusher.js'
import customValMessages from './config/vee-validate/messages'
import { mediumFontClass } from '@/components/utils/constants'

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
  window.Echo.channel('updateCommentCount').listen(
    'UpdateCommentCount',
    ({ quoteId, commentsCount }) => {
      quotesStore.quote?.id === quoteId
        ? (quotesStore.quote.comments_count = commentsCount)
        : (quotesStore.quotes.find((q) => q.id === quoteId).comments_count = commentsCount)
    }
  )

  window.Echo.channel('updateLikeCount').listen('UpdateLikeCount', ({ quoteId, likeCount }) => {
    quotesStore.quote?.id === quoteId
      ? (quotesStore.quote.likes_count = likeCount)
      : (quotesStore.quotes.find((q) => q.id === quoteId).likes_count = likeCount)
  })
})
</script>

<template>
  <BaseStatusDialog
    :title="$t('token.link_expired')"
    :img-alt="$t('alts.icons_expired_icon')"
    img-src="/icons_expired.svg"
    :show="tokenStore.expiredTokenDialogVisibility"
    @close="tokenStore.toggleTokenExpiredDialogVisibility"
    :top="topRef"
  >
    <p>{{ $t('token.link_has_expired') }}</p>
  </BaseStatusDialog>

  <div :class="mediumFontClass">
    <RouterView />
  </div>
</template>
