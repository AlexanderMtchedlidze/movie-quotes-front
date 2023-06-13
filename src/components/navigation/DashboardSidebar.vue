<script setup>
import { computed, defineAsyncComponent } from 'vue'

import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useUserProfileImagePath } from '@/hooks/useFullImagePath'

const route = useRoute()
const authStore = useAuthStore()

const newsFeedLink = computed(() => ({ name: 'newsFeed' }))
const isCurrentRouteNewsFeed = computed(() => route.name === 'newsFeed')

const moviesListLink = computed(() => ({ name: 'moviesList' }))
const isCurrentRouteMoviesList = computed(() => route.name === 'moviesList')

const userProfileLink = computed(() => ({ name: 'userProfile' }))
const isCurrentRouteUserProfile = computed(() => route.name === 'userProfile')

const userProfileImageWrapper = computed(() => ({
  'ring-2': isCurrentRouteUserProfile.value,
  'ring-red': isCurrentRouteUserProfile.value
}))

const wrapperClass = computed(() => ({
  'fixed z-10': route.name === 'moviesList'
}))

const userProfileImageSrc = computed(() => useUserProfileImagePath(authStore.user.profile_image))

const SidebarItem = defineAsyncComponent(() => import('../navigation/SidebarItem.vue'))
</script>

<template>
  <div :class="wrapperClass">
    <div class="flex gap-6">
      <div class="rounded-full w-14 h-14" :class="userProfileImageWrapper">
        <img :src="userProfileImageSrc" alt="User profile image" class="w-14 h-14 rounded-full" />
      </div>
      <div class="flex flex-col justify-center">
        <p class="text-xl truncate whitespace-nowrap">{{ authStore.user.name }}</p>
        <BaseLink :to="userProfileLink" type="tertiary" class="text-input-disabled-border">{{
          $t('dashboard.sidebar.edit_your_profile')
        }}</BaseLink>
      </div>
    </div>
    <div class="ml-3 mt-12 flex flex-col gap-12">
      <SidebarItem :to="newsFeedLink" :linkText="$t('dashboard.sidebar.news_feed')">
        <img
          v-if="isCurrentRouteNewsFeed"
          src="@/assets/icons/navigation/news-feed-active.svg"
          alt="Red home icon"
        />
        <img v-else src="@/assets/icons/navigation/news-feed-inactive.svg" alt="White home icon" />
      </SidebarItem>
      <SidebarItem :to="moviesListLink" :linkText="$t('dashboard.sidebar.movies_list')">
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
</template>
