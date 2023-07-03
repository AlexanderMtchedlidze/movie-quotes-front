<script setup>
import { computed, defineAsyncComponent } from 'vue'

import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useUserProfileImagePath } from '@/hooks/useFullImagePath'

const route = useRoute()
const authStore = useAuthStore()

const newsFeedLink = computed(() => ({ name: 'newsFeed' }))
const isCurrentRouteNewsFeed = computed(() => route.name === 'newsFeed' || route.name === 'quote')

const moviesListLink = computed(() => ({ name: 'moviesList' }))
const isCurrentRouteMoviesList = computed(
  () => route.name === 'moviesList' || route.name === 'movie'
)

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
        <div class="flex-shrink-0 rounded-full w-14 h-14" :class="userProfileImageWrapper">
          <img
            :src="userProfileImageSrc"
            :alt="$t('alts.user_profile_image')"
            class="w-14 h-14 rounded-full"
          />
        </div>
        <div class="flex flex-col justify-center">
          <p class="text-xl break-words">{{ authStore.user.name }}</p>
          <div>
            <BaseLink :to="userProfileLink" type="tertiary" class="text-input-disabled-border">{{
              $t('dashboard.sidebar.edit_your_profile')
            }}</BaseLink>
          </div>
        </div>
      </div>
      <LangDropdown text-size="text-base" class="ml-6" />
    </div>
    <div class="flex flex-col gap-6">
      <SidebarItem
        :to="newsFeedLink"
        :linkText="$t('dashboard.sidebar.news_feed')"
        class="py-2 ps-14"
        :class="{ 'bg-midnight-creme-brulee': isCurrentRouteNewsFeed }"
      >
        <img src="@/assets/icons/navigation/news-feed-inactive.svg" :alt="$t('alts.home_icon')" />
      </SidebarItem>
      <SidebarItem
        :to="moviesListLink"
        :linkText="$t('dashboard.sidebar.movies_list')"
        class="py-2 ps-14"
        :class="{ 'bg-midnight-creme-brulee': isCurrentRouteMoviesList }"
      >
        <img
          src="@/assets/icons/navigation/movies-list-inactive.svg"
          :alt="$t('alts.camera_icon')"
        />
      </SidebarItem>
    </div>
    <div class="my-6 ml-9">
      <ActionButton type="outline" @click="authStore.handleLogout" class="mt-6">{{
        $t('dashboard.header.actions.logout')
      }}</ActionButton>
    </div>
  </div>
</template>
