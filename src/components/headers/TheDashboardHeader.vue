<script setup>
import { defineAsyncComponent } from 'vue'

import { useAuthStore } from '@/stores/auth'
import { useDashboardSidebarStore } from '@/stores/dashboardSidebar'
import { useSearchStore } from '@/stores/search'

const authStore = useAuthStore()
const searchStore = useSearchStore()
const dashboardSidebarStore = useDashboardSidebarStore()

const DashboardSidebar = defineAsyncComponent(() => import('../navigation/DashboardSidebar.vue'))
const TheNotificationPanel = defineAsyncComponent(() =>
  import('../notification/TheNotificationPanel.vue')
)
const LangDropdown = defineAsyncComponent(() => import('../dropdown/LangDropdown.vue'))
const BaseMenu = defineAsyncComponent(() => import('../ui/BaseMenu.vue'))
</script>

<template>
  <BaseMenu
    v-show="dashboardSidebarStore.isDashboardSidebarVisible"
    class="w-[90vw] h-[60vh] p-9 bg-midnight-blue"
    @close="dashboardSidebarStore.hideDashboardSidebar"
  >
    <div class="flex justify-between">
      <DashboardSidebar sidebar-items-wrapper-class="ml-3 mt-12 flex flex-col gap-12" />
      <LangDropdown text-size="text-base" class="mt-6" />
    </div>
    <div class="mt-6 ml-3">
      <ActionButton type="outline" @click="authStore.handleLogout" class="mt-6">{{
        $t('dashboard.header.actions.logout')
      }}</ActionButton>
    </div>
  </BaseMenu>

  <BaseMenu
    v-show="searchStore.isSearchPanelVisible"
    class="w-[100vw] h-[70vh] bg-midnight-blue"
    @close="searchStore.hideSearchPanel"
  >
    <header class="py-6 px-8 flex gap-6 border-b border-gray-slate text-lg">
      <img
        src="@/assets/icons/navigation/white-back-arrow.svg"
        alt="Backward navigation white arrow"
      />
      <input
        v-model.trim="searchStore.searchQuery"
        @keyup.enter="searchStore.sendSearchQuery"
        type="text"
        placeholder="Search"
        class="w-full border-none focus:outline-none bg-transparent placeholder:text-white"
      />
    </header>
    <div class="pt-7 ps-16 ml-2 flex flex-col gap-5 text-gray-slate">
      <p>
        Enter
        <span class="text-white">@</span>
        to search movies
      </p>
      <p>
        Enter
        <span class="text-white">#</span>
        to search quotes
      </p>
    </div>
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
      <TheNotificationPanel />
      <LangDropdown class="hidden md:block" />
      <img
        src="@/assets/icons/input/search-icon.svg"
        alt="Search icon"
        class="block md:hidden"
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
