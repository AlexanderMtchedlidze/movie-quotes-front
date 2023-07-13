<script setup>
import { computed, defineAsyncComponent } from 'vue'

import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useUserProfileImagePath } from '@/hooks/useFullImagePath'

const route = useRoute()
const authStore = useAuthStore()

const newsFeedLink = computed(() => ({ name: 'newsFeed' }))
const isCurrentRouteNewsFeed = computed(
  () => route.name === 'newsFeed' || route.name === 'quote' || route.name === 'newQuoteDialog'
)

const moviesListLink = computed(() => ({ name: 'moviesList' }))
const isCurrentRouteMoviesList = computed(
  () =>
    route.name === 'moviesList' ||
    route.name === 'movie' ||
    route.name === 'editMovieDialog' ||
    route.name === 'viewQuoteDialog' ||
    route.name === 'editQuoteDialog'
)

const userProfileLink = computed(() => ({ name: 'userProfile' }))
const isCurrentRouteUserProfile = computed(() => route.name === 'userProfile')

const userProfileImageWrapper = computed(() => ({
  'ring-2': isCurrentRouteUserProfile.value,
  'ring-red': isCurrentRouteUserProfile.value
}))

const userProfileImageSrc = computed(() => useUserProfileImagePath(authStore.user?.profile_image))

const SidebarItem = defineAsyncComponent(() => import('../navigation/SidebarItem.vue'))
</script>

<template>
  <div>
    <div class="flex gap-6">
      <div class="rounded-full w-14 h-14 flex-shrink-0" :class="userProfileImageWrapper">
        <img
          :src="userProfileImageSrc"
          :alt="$t('alts.user_profile_image')"
          class="w-14 h-14 rounded-full"
        />
      </div>
      <div class="flex flex-col justify-center">
        <p class="text-xl">{{ authStore.user?.name }}</p>
        <div>
          <BaseLink :to="userProfileLink" type="tertiary" class="text-input-disabled-border">{{
            $t('dashboard.sidebar.edit_your_profile')
          }}</BaseLink>
        </div>
      </div>
    </div>
    <div class="ml-3 mt-12 flex flex-col gap-12">
      <SidebarItem :to="newsFeedLink" :linkText="$t('dashboard.sidebar.news_feed')">
        <img
          v-if="isCurrentRouteNewsFeed"
          src="@/assets/icons/navigation/news-feed-active.svg"
          :alt="$t('alts.home_icon')"
        />
        <img
          v-else
          src="@/assets/icons/navigation/news-feed-inactive.svg"
          :alt="$t('alts.home_icon')"
        />
      </SidebarItem>
      <SidebarItem :to="moviesListLink" :linkText="$t('dashboard.sidebar.movies_list')">
        <img
          v-if="isCurrentRouteMoviesList"
          src="@/assets/icons/navigation/movies-list-active.svg"
          :alt="$t('alts.camera_icon')"
        />
        <img
          v-else
          src="@/assets/icons/navigation/movies-list-inactive.svg"
          :alt="$t('alts.camera_icon')"
        />
      </SidebarItem>
    </div>
  </div>
</template>
