<script setup>
import { defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useQuotesStore } from '@/stores/quotes'

const route = useRoute()
const handleScroll = async () => {
  const scrollContainer = document.getElementById('scrollContainer')

  const scrollY = scrollContainer.scrollTop
  const scrollHeight = scrollContainer.scrollHeight

  if (scrollY + innerHeight >= scrollHeight) {
    if (route.name === 'newsFeed') {
      const quotesStore = useQuotesStore()
      quotesStore.page++
      await quotesStore.handleGettingAllQuotes()
    }
  }
}

const TheDashboardHeader = defineAsyncComponent(() => import('../headers/TheDashboardHeader.vue'))
const DashboardSidebar = defineAsyncComponent(() => import('../navigation/DashboardSidebar.vue'))
</script>

<template>
  <div class="h-screen overflow-hidden">
    <TheDashboardHeader />
    <div class="flex lg:gap-16 xl:gap-32 bg-dashboard-gradient h-full">
      <div class="text-white hidden md:block">
        <div class="flex flex-col pt-32 gap-10 ps-16 w-80">
          <DashboardSidebar />
        </div>
      </div>
      <section
        class="pt-24 text-white w-full overflow-y-auto"
        id="scrollContainer"
        @scroll="handleScroll"
      >
        <slot></slot>
      </section>
    </div>
  </div>
</template>