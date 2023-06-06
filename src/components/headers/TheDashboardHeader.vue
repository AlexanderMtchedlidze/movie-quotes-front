<script setup>
import { defineAsyncComponent, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

import { useAuthStore } from '@/stores/auth'
import { useNotificationStore } from '@/stores/notifications'
import { useDashboardSidebarStore } from '@/stores/dashboardSidebar'

const authStore = useAuthStore()
const notificationStore = useNotificationStore()
const dashboardSidebarStore = useDashboardSidebarStore()

const sidebarTarget = ref(null)
const notificationTarget = ref(null)

onClickOutside(sidebarTarget, () => (dashboardSidebarStore.isDashboardSidebarVisible = false))
onClickOutside(notificationTarget, () => (notificationStore.isNotificationPanelVisible = false))

const DashboardSidebar = defineAsyncComponent(() => import('../navigation/DashboardSidebar.vue'))
const NotificationItem = defineAsyncComponent(() => import('../notification/NotificationItem.vue'))
const BaseMenu = defineAsyncComponent(() => import('../ui/BaseMenu.vue'))
</script>

<template>
  <BaseMenu
    v-show="dashboardSidebarStore.isDashboardSidebarVisible"
    class="w-[90vw] h-[40vh] p-9 bg-midnight-blue"
    ref="sidebarTarget"
  >
    <DashboardSidebar sidebar-items-wrapper-class="ml-3 mt-12 flex flex-col gap-12" />
  </BaseMenu>
  <header
    class="flex items-center justify-between py-8 md:py-6 px-9 md:px-12 lg:px-16 bg-midnight-creme-brulee"
  >
    <img
      src="@/assets/icons/sidebar/burger-menu.svg"
      alt="List icon"
      class="block md:hidden"
      @click="dashboardSidebarStore.toggleDashboardSidebarVisibility"
    />
    <h3 class="uppercase font-medium text-creme-brulee hidden md:block">
      {{ $t('home.header.title') }}
    </h3>
    <div class="flex gap-9 items-center">
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
          <div
            v-show="notificationStore.isNotificationPanelVisible"
            class="absolute top-10"
            ref="notificationTarget"
          >
            <img src="@/assets/icons/polygon.svg" alt="Polygon icon" />
          </div>
          <BaseMenu
            v-show="notificationStore.isNotificationPanelVisible"
            class="top-14 -right-[92px] md:-right-[13rem] w-[100vw] max-h-[70vh] rounded-lg md:w-[45rem] md:h-96 py-10 px-8 bg-black"
          >
            <div class="flex items-end justify-between mb-6">
              <h4 class="font-medium text-xl md:text-3xl">Notifications</h4>
              <span class="text-base md:text-xl underline hover:cursor-pointer"
                >Mark as all read</span
              >
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
      <LangDropdown class="hidden md:block" />
      <img src="@/assets/icons/input/search-icon.svg" alt="Search icon" class="block md:hidden" />
      <ActionButton
        type="outline"
        @click="authStore.handleLogout"
        class="text-sm md:text-base hidden md:block"
        >{{ $t('dashboard.header.actions.logout') }}</ActionButton
      >
    </div>
  </header>
</template>
