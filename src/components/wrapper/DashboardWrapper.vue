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
  <header
    class="flex items-center justify-between py-8 md:py-6 px-9 md:px-12 lg:px-16 bg-midnight-creme-brulee"
  >
    <img src="@/assets/icons/sidebar/burger-menu.svg" alt="List icon" class="block md:hidden" />
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
          <div v-show="notificationStore.isNotificationPanelVisible" class="absolute top-10">
            <img src="@/assets/icons/polygon.svg" alt="Polygon icon" />
          </div>
          <div
            v-show="notificationStore.isNotificationPanelVisible"
            class="absolute top-14 -right-[92px] md:-right-[13rem] text-white bg-black rounded-lg w-[100vw] md:w-[45rem] max-h-[70vh] md:h-96 py-10 px-8 z-50 overflow-y-auto"
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
          </div>
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
  <div class="flex lg:gap-16 xl:gap-32 pt-8 bg-dashboard-gradient">
    <div class="text-white hidden lg:block">
      <div class="flex flex-col gap-10 ps-16 w-80">
        <div class="flex gap-6">
          <img :src="userProfileImageSrc" alt="User profile image" class="w-14 h-14" />
          <div class="flex flex-col justify-center">
            <p class="text-xl whitespace-nowrap">{{ authStore.user.name }}</p>
            <BaseLink to="#" type="tertiary" class="text-input-disabled-border"
              >Edit your profile</BaseLink
            >
          </div>
        </div>
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
      </div>
    </div>
    <section class="text-white">
      <slot></slot>
    </section>
  </div>
</template>
