<script setup>
import { useAuthStore } from '@/stores/auth'
import { useNotificationStore } from '@/stores/notifications'
import { computed, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useUserProfileImagePath } from '@/hooks/useFullImagePath'

const route = useRoute()
const authStore = useAuthStore()
const notificationStore = useNotificationStore()

const newsFeedLink = computed(() => ({ name: 'newsFeed' }))
const isCurrentRouteNewsFeed = computed(() => route.name === 'newsFeed')

const moviesListLink = computed(() => ({ name: 'moviesList' }))
const isCurrentRouteMoviesList = computed(() => route.name === 'moviesList')

const userProfileImageSrc = useUserProfileImagePath(authStore.user.profile_image)

const SidebarItem = defineAsyncComponent(() => import('../navigation/SidebarItem.vue'))
const NotificationItem = defineAsyncComponent(() => import('../notification/NotificationItem.vue'))
</script>

<template>
  <header class="flex items-center justify-between py-4 px-16 bg-midnight-creme-brulee">
    <h3 class="uppercase font-medium text-creme-brulee">{{ $t('home.header.title') }}</h3>
    <div class="flex gap-9 items-center">
      <div
        class="relative hover:cursor-pointer"
        @click="notificationStore.toggleNotificationPanelVisibility"
      >
        <img src="@/assets/icons/notification-bell.svg" alt="Notification bell" />
        <div
          class="absolute bottom-3 left-3 rounded-full bg-notification-red w-6 h-6 text-center text-white font-medium"
        >
          3
        </div>
        <div class="hover:cursor-default">
          <div v-show="notificationStore.isNotificationPanelVisible" class="absolute top-10">
            <img src="@/assets/icons/polygon.svg" alt="Polygon icon" />
          </div>
          <div
            v-show="notificationStore.isNotificationPanelVisible"
            class="absolute top-14 -right-[214px] text-white bg-black rounded-lg w-[45rem] h-96 py-10 px-8 z-50 overflow-y-auto"
          >
            <div class="flex items-end justify-between mb-6">
              <h4 class="font-medium text-3xl">Notifications</h4>
              <span class="text-xl underline hover:cursor-pointer">Mark as all read</span>
            </div>
            <div class="flex flex-col gap-4">
              <NotificationItem
                :read="false"
                notification-author-profile-image-src="/default-profile-image.png"
                notification-author-name="Nino tabagari"
                action="liked"
                time="7 min"
              />
              <NotificationItem
                read
                notification-author-profile-image-src="/default-profile-image.png"
                notification-author-name="Nino tabagari"
                action="commented"
                time="7 min"
              />
            </div>
          </div>
        </div>
      </div>
      <LangDropdown />
      <ActionButton type="outline" @click="authStore.handleLogout">{{
        $t('dashboard.header.actions.logout')
      }}</ActionButton>
    </div>
  </header>
  <div class="flex gap-32 pt-8 bg-dashboard-gradient">
    <nav class="text-white">
      <ul class="flex flex-col gap-10 ps-16">
        <li class="flex gap-6">
          <img :src="userProfileImageSrc" alt="User profile image" class="w-14 h-14" />
          <div class="flex flex-col justify-center">
            <p class="text-xl">{{ authStore.user.name }}</p>
            <BaseLink to="#" type="tertiary" class="text-input-disabled-border"
              >Edit your profile</BaseLink
            >
          </div>
        </li>
        <SidebarItem :to="newsFeedLink" linkText="News feed">
          <img
            v-if="isCurrentRouteNewsFeed"
            src="@/assets/icons/navigation/news-feed-active.svg"
            alt="Red home icon"
          />
          <img
            v-else
            src="@/assets/icons/navigation/news-feed-inactive.svg"
            alt="White home icon"
          />
        </SidebarItem>
        <SidebarItem :to="moviesListLink" linkText="Movies list">
          <img
            v-if="isCurrentRouteMoviesList"
            src="@/assets/icons/navigation/movies-list-active.svg"
            alt="Red camera reels icon"
          />
          <img
            v-else
            src="@/assets/icons/navigation/movies-list-inactive.svg"
            alt="White camera reels icon"
          />
        </SidebarItem>
      </ul>
    </nav>
    <section class="text-white flex-1">
      <slot></slot>
    </section>
  </div>
</template>
