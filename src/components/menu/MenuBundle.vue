<script setup>
import { computed, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'

import { useDashboardSidebarStore } from '@/stores/dashboardSidebar'
import { useSearchStore } from '@/stores/search'

const searchStore = useSearchStore()
const dashboardSidebarStore = useDashboardSidebarStore()

const route = useRoute()
const isCurrentRouteNewsFeed = computed(() => route.name === 'newsFeed')

const BackwardNavigation = defineAsyncComponent(() =>
  import('../navigation/BackwardNavigation.vue')
)
const MobileSidebar = defineAsyncComponent(() => import('../navigation/MobileSidebar.vue'))
const BaseMenu = defineAsyncComponent(() => import('../ui/BaseMenu.vue'))
</script>

<template>
  <BaseMenu
    v-show="dashboardSidebarStore.isDashboardSidebarVisible"
    class="w-[90vw] h-[60vh] rounded-r-xl bg-midnight-blue block md:hidden"
    @close="dashboardSidebarStore.hideDashboardSidebar"
  >
    <MobileSidebar />
  </BaseMenu>

  <BaseMenu
    v-show="searchStore.isSearchPanelVisible"
    class="w-[100vw] md:w-[70vw] h-[70vh] bg-midnight-blue block lg:hidden"
    @close="searchStore.hideSearchPanel"
  >
    <header class="py-6 px-8 flex gap-6 border-b border-gray-slate text-lg">
      <BackwardNavigation />
      <input
        v-model.trim="searchStore.searchQuery"
        @keyup.enter="searchStore.sendSearchQuery"
        type="text"
        :placeholder="$t('dashboard.search.search')"
        class="w-full border-none focus:outline-none bg-transparent placeholder:text-white"
      />
    </header>
    <div class="pt-7 ps-16 ml-2 text-gray-slate">
      <div v-if="isCurrentRouteNewsFeed" class="flex flex-col gap-5">
        <p>
          {{ $t('dashboard.search.enter') }}
          <span class="text-white">@</span>
          {{ $t('dashboard.search.to_search_movies') }}
        </p>
        <p>
          {{ $t('dashboard.search.enter') }}
          <span class="text-white">@</span>
          {{ $t('dashboard.search.to_search_quotes') }}
        </p>
      </div>
      <div v-else>
        <p>{{ $t('dashboard.search.search_movies') }}</p>
      </div>
    </div>
  </BaseMenu>
</template>
