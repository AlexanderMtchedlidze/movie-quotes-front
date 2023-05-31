<script setup>
import { computed, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const SidebarItem = defineAsyncComponent(() => import('./SidebarItem.vue'))

const newsFeedLink = computed(() => ({ name: 'newsFeed' }))
const isCurrentRouteNewsFeed = computed(() => route.name === 'newsFeed')

const moviesListLink = computed(() => ({ name: 'moviesList' }))
const isCurrentRouteMoviesList = computed(() => route.name === 'moviesList')
</script>

<template>
  <nav class="text-white">
    <div class="flex flex-col gap-10">
      <div class="flex gap-6">
        <img src="@/assets/images/default-profile-image.png" alt="User profile image" />
        <div class="flex flex-col items-center">
          <p class="text-xl">Nino Tabagari</p>
          <BaseLink to="#" type="tertiary">Edit your profile</BaseLink>
        </div>
      </div>
      <SidebarItem :to="newsFeedLink" linkText="News feed">
        <img
          v-if="isCurrentRouteNewsFeed"
          src="@/assets/icons/navigation/news-feed-active.svg"
          alt="Red home icon"
        />
        <img v-else src="@/assets/icons/navigation/news-feed-inactive.svg" alt="White home icon" />
      </SidebarItem>
      <SidebarItem to="#" linkText="Movies list">
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
  </nav>
</template>
