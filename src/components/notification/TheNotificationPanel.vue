<script setup>
import { defineAsyncComponent } from 'vue'
import { useNotificationStore } from '@/stores/notifications'

const notificationStore = useNotificationStore()

const NotificationItem = defineAsyncComponent(() => import('../notification/NotificationItem.vue'))
const BaseMenu = defineAsyncComponent(() => import('../ui/BaseMenu.vue'))
</script>

<template>
  <div
    class="relative hover:cursor-pointer"
    @click="notificationStore.toggleNotificationPanelVisibility"
  >
    <img
      src="@/assets/icons/notification-bell.svg"
      alt="Notification bell"
      class="w-5 h-6 md:w-7 md:h-8"
    />
    <div
      class="absolute bottom-3 left-2 md:left-3 rounded-full bg-notification-red w-5 h-5 md:w-6 md:h-6 text-center text-white font-medium text-sm md:text-base"
    >
      3
    </div>
    <div class="hover:cursor-default">
      <div v-show="notificationStore.isNotificationPanelVisible" class="absolute top-10">
        <img src="@/assets/icons/polygon.svg" alt="Polygon icon" />
      </div>
      <BaseMenu
        v-show="notificationStore.isNotificationPanelVisible"
        class="top-14 -right-[92px] md:-right-[13rem] w-[100vw] max-h-[70vh] rounded-lg md:w-[45rem] md:h-96 py-10 px-8 bg-black"
      >
        <div class="flex items-end justify-between mb-6">
          <h4 class="font-medium text-xl md:text-3xl">Notifications</h4>
          <span class="text-base md:text-xl underline hover:cursor-pointer">Mark as all read</span>
        </div>
        <div class="flex flex-col gap-4">
          <NotificationItem
            :read="false"
            notification-author-profile-image-src="/default-profile-image.png"
            notification-author-name="Nino tabagari"
            action="liked"
            time="7 min"
          />
        </div>
      </BaseMenu>
    </div>
  </div>
</template>
