<script setup>
import { computed, defineAsyncComponent } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useDashboardSidebarStore } from '@/stores/dashboardSidebar'
import { useSearchStore } from '@/stores/search'
import { useLocalization } from '@/stores/localization'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'

const localizationStore = useLocalization()

const mediumFontClass = storeToRefs(localizationStore)

const route = useRoute()

const isCurrentPageNewsFeedOrMoviesList = computed(
  () => route.name === 'moviesList' || route.name === 'newsFeed'
)

const authStore = useAuthStore()
const searchStore = useSearchStore()
const dashboardSidebarStore = useDashboardSidebarStore()

const TheNotificationPanel = defineAsyncComponent(() =>
  import('../notification/TheNotificationPanel.vue')
)
const MenuBundle = defineAsyncComponent(() => import('../menu/MenuBundle.vue'))
const LangDropdown = defineAsyncComponent(() => import('../dropdown/LangDropdown.vue'))
</script>

<template>
  <MenuBundle />
  <header
    class="fixed flex w-full z-10 items-center justify-between py-8 md:py-6 px-9 md:px-12 lg:px-16 bg-midnight-creme-brulee"
  >
    <img
      src="@/assets/icons/sidebar/burger-menu.svg"
      :alt="$t('alts.list_icon')"
      class="block md:hidden hover:cursor-pointer"
      @click="dashboardSidebarStore.toggleDashboardSidebarVisibility"
    />
    <h3 :class="mediumFontClass" class="uppercase text-creme-brulee hidden md:block">
      {{ $t('home.header.title') }}
    </h3>
    <div class="flex gap-9 items-center">
      <TheNotificationPanel />
      <LangDropdown class="hidden md:block" />
      <img
        v-if="isCurrentPageNewsFeedOrMoviesList"
        src="@/assets/icons/input/search-icon.svg"
        :alt="$t('alts.search_icon')"
        class="block lg:hidden hover:cursor-pointer"
        @click="searchStore.toggleSearchPanelVisibility"
      />
      <ActionButton
        type="outline"
        @click="authStore.handleLogout"
        class="text-sm md:text-base hidden md:block"
        >{{ $t('dashboard.header.actions.logout') }}</ActionButton
      >
    </div>
  </header>
</template>
