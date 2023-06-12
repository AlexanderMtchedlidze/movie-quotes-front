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

const sidebarItemWrapperClass = computed(() => [
  'py-2',
  'ps-14',
  {
    'bg-midnight-creme-brulee': isCurrentRouteNewsFeed.value || isCurrentRouteMoviesList.value
  }
])

const userProfileLink = computed(() => ({ name: 'userProfile' }))
const isCurrentRouteUserProfile = computed(() => route.name === 'userProfile')

const userProfileImageWrapper = computed(() => ({
  'ring-2': isCurrentRouteUserProfile.value,
  'ring-red': isCurrentRouteUserProfile.value
}))

const userProfileImageSrc = computed(() => useUserProfileImagePath(authStore.user.profile_image))

const LangDropdown = defineAsyncComponent(() => import('../dropdown/LangDropdown.vue'))
const SidebarItem = defineAsyncComponent(() => import('../navigation/SidebarItem.vue'))
</script>

<template>
  <div>
    <div class="flex justify-between p-9 items-center">
      <div class="flex justify-between gap-6">
        <div class="rounded-full" :class="userProfileImageWrapper">
          <img :src="userProfileImageSrc" alt="User profile image" class="w-14 h-14 rounded-full" />
        </div>
        <div class="flex flex-col justify-center">
          <p class="text-xl whitespace-nowrap">{{ authStore.user.name }}</p>
          <BaseLink :to="userProfileLink" type="tertiary" class="text-input-disabled-border">{{
            $t('dashboard.sidebar.edit_your_profile')
          }}</BaseLink>
        </div>
      </div>
      <LangDropdown text-size="text-base" />
    </div>
    <div class="flex flex-col gap-12">
      <SidebarItem :to="newsFeedLink" linkText="News feed" :class="sidebarItemWrapperClass">
        <img src="@/assets/icons/navigation/news-feed-inactive.svg" alt="White home icon" />
      </SidebarItem>
      <SidebarItem :to="moviesListLink" linkText="Movies list" :class="sidebarItemWrapperClass">
        <img
          src="@/assets/icons/navigation/movies-list-inactive.svg"
          alt="White camera reels icon"
        />
      </SidebarItem>
    </div>
    <div class="mt-6 ml-9">
      <ActionButton type="outline" @click="authStore.handleLogout" class="mt-6">{{
        $t('dashboard.header.actions.logout')
      }}</ActionButton>
    </div>
  </div>
</template>