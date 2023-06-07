<script setup>
import { defineAsyncComponent } from 'vue'

import { useDashboardSidebarStore } from '@/stores/dashboardSidebar'
import { useSearchStore } from '@/stores/search'

const searchStore = useSearchStore()
const dashboardSidebarStore = useDashboardSidebarStore()

const BackwardNavigation = defineAsyncComponent(() =>
  import('../navigation/BackwardNavigation.vue')
)
const MobileSidebar = defineAsyncComponent(() => import('../navigation/MobileSidebar.vue'))
const BaseMenu = defineAsyncComponent(() => import('../ui/BaseMenu.vue'))
</script>

<template>
  <BaseMenu
    v-show="dashboardSidebarStore.isDashboardSidebarVisible"
    class="w-[90vw] h-[60vh] rounded-r-xl bg-midnight-blue"
    @close="dashboardSidebarStore.hideDashboardSidebar"
  >
    <MobileSidebar />
  </BaseMenu>

  <BaseMenu
    v-show="searchStore.isSearchPanelVisible"
    class="w-[100vw] h-[70vh] bg-midnight-blue"
    @close="searchStore.hideSearchPanel"
  >
    <header class="py-6 px-8 flex gap-6 border-b border-gray-slate text-lg">
      <BackwardNavigation />
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
</template>
