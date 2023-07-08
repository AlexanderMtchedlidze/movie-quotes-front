<script setup>
import { defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useQuotesStore } from '@/stores/quotes'
import { useSearchStore } from '@/stores/search'
import { computed } from 'vue'

const props = defineProps({
  gap: {
    type: String,
    required: false,
    default: 'md'
  }
})

const sidebarWrapperClass = computed(() => ({
  'lg:gap-8 xl:gap-16': props.gap === 'md',
  'lg:gap-4 xl:gap-8': props.gap === 'sm'
}))

const route = useRoute()

const handleScroll = async () => {
  const scrollContainer = document.getElementById('scrollContainer')

  const scrollY = scrollContainer.scrollTop
  const scrollHeight = scrollContainer.scrollHeight

  if (scrollY + innerHeight >= scrollHeight) {
    if (route.name === 'newsFeed') {
      if (route.query === null) {
        const quotesStore = useQuotesStore()
        quotesStore.page++
        await quotesStore.handleGettingAllQuotes()
        return
      } else if (route.query.filters === 'quotes') {
        const searchStore = useSearchStore()
        searchStore.quotesSearchPage++
        await searchStore.sendSearchQuery()
      } else if (route.query.filters === 'movies') {
        const searchStore = useSearchStore()
        searchStore.moviesSearchPage++
        await searchStore.sendSearchQuery()
      } else if (route.query.filters === 'all') {
        const searchStore = useSearchStore()
        searchStore.allSearchPage++
        await searchStore.sendSearchQuery()
      }
    }
  }
}

const TheDashboardHeader = defineAsyncComponent(() => import('../headers/TheDashboardHeader.vue'))
const DashboardSidebar = defineAsyncComponent(() => import('../navigation/DashboardSidebar.vue'))
</script>

<template>
  <div class="h-screen overflow-hidden">
    <TheDashboardHeader />
    <div class="flex bg-dashboard-gradient h-full" :class="sidebarWrapperClass">
      <div class="text-white hidden md:block">
        <div class="flex flex-col pt-32 gap-10 ps-10 lg:ps-16 w-80">
          <DashboardSidebar />
        </div>
      </div>
      <section
        class="pt-24 text-white w-full 2xl:w-10/12 overflow-y-auto"
        id="scrollContainer"
        @scroll="handleScroll"
      >
        <slot></slot>
      </section>
    </div>
  </div>
</template>
