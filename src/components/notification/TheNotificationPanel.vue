<script setup>
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { defineAsyncComponent, onMounted } from 'vue'
import { useNotificationStore } from '@/stores/notifications'
import { useLocalization } from '@/stores/localization'
import { useUserProfileImagePath } from '@/hooks/useFullImagePath'
import { storeToRefs } from 'pinia'

const localizationStore = useLocalization()

const mediumFontClass = storeToRefs(localizationStore)

const notificationStore = useNotificationStore()

onMounted(async () => {
  await notificationStore.handleGettingAllNotifications()
})

const getUserProfileImageSrc = (profileImage) => useUserProfileImagePath(profileImage)

const { t } = useI18n()

const getNotificationAction = (liked, commented) => {
  if (liked) {
    return 'liked'
  } else if (commented) {
    return 'commented'
  }
  return ''
}

const getTimeDuration = (datetime) => {
  const currentTime = new Date()
  const notificationTime = new Date(datetime)

  const timeDiff = currentTime.getTime() - notificationTime.getTime()
  const minutes = Math.floor(timeDiff / (1000 * 60))

  if (minutes < 60) {
    return minutes + ' ' + t('notifications.min_ago')
  } else {
    const hours = Math.floor(minutes / 60)

    if (hours < 24) {
      return hours + ' ' + t('notifications.hours_ago')
    } else {
      const days = Math.floor(hours / 24)
      return days + ' ' + t('notifications.days_ago')
    }
  }
}

const router = useRouter()
const switchToNotifiableQuote = async (notificationId, quoteId) => {
  await notificationStore.handleMarkingNotificationAsRead(notificationId)
  await router.push({ name: 'quote', params: { id: quoteId } })
}

const NotificationItem = defineAsyncComponent(() =>
  import('@/components/notification/NotificationItem.vue')
)
const BaseMenu = defineAsyncComponent(() => import('@/components/ui/BaseMenu.vue'))
</script>

<template>
  <div class="relative hover:cursor-pointer">
    <img
      src="@/assets/icons/notification-bell.svg"
      :alt="$t('alts.notification_bell_icon')"
      class="w-5 h-6 md:w-7 md:h-8"
      @click="notificationStore.toggleNotificationPanelVisibility"
    />
    <div
      :class="mediumFontClass"
      class="absolute bottom-3 left-2 md:left-3 rounded-full bg-notification-red w-5 h-5 md:w-6 md:h-6 text-center text-white text-sm md:text-base"
      @click="notificationStore.toggleNotificationPanelVisibility"
    >
      {{ notificationStore.notificationsCount }}
    </div>
    <div class="hover:cursor-default">
      <div v-show="notificationStore.isNotificationPanelVisible" class="absolute top-10">
        <img src="@/assets/icons/polygon.svg" :alt="$t('alts.polygon_icon')" />
      </div>
      <BaseMenu
        v-show="notificationStore.isNotificationPanelVisible"
        class="top-14 -right-[92px] md:-right-[13rem] w-[100vw] max-h-[70vh] rounded-lg md:w-[45rem] md:h-96 py-10 px-8 bg-black"
      >
        <div class="flex items-end justify-between gap-4 mb-6">
          <h4 :class="mediumFontClass" class="text-xl md:text-3xl">
            {{ $t('notifications.notifications') }}
          </h4>
          <span
            v-if="notificationStore.notificationsCount"
            class="text-sm md:text-xl underline hover:cursor-pointer"
            @click="notificationStore.handleMarkingAllNotificationsAsRead"
            >{{ $t('notifications.mark_all_as_read') }}</span
          >
        </div>
        <div class="flex flex-col gap-4">
          <NotificationItem
            v-for="notification in notificationStore.notificationsRef"
            :key="notification.id"
            :read="notification.read"
            :notification-author-profile-image-src="
              getUserProfileImageSrc(notification.sender.profile_image)
            "
            :notification-author-name="notification.sender.name"
            :action="getNotificationAction(notification.liked, notification.commented)"
            :time="getTimeDuration(notification.created_at)"
            @click="switchToNotifiableQuote(notification.id, notification.quote_id)"
          />
        </div>
      </BaseMenu>
    </div>
  </div>
</template>
