<script setup>
import { defineAsyncComponent } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useDashboardSidebarStore } from '@/stores/dashboardSidebar'
import { useSearchStore } from '@/stores/search'
import { mediumFontClass } from '@/components/utils/constants'

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
        src="@/assets/icons/input/search-icon.svg"
        :alt="$t('alts.search_icon')"
        class="block md:hidden hover:cursor-pointer"
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
