<script setup>
import { useSearchStore } from '@/stores/search'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

defineProps({
  placeholder: {
    type: String,
    required: true
  }
})

const searchStore = useSearchStore()

const route = useRoute()

const wrapperClass = computed(() => ({
  'lg:block': route.name !== 'moviesList',
  'lg:block': route.name === 'moviesList'
}))
</script>

<template>
  <div
    v-if="searchStore.isSearchInputVisible"
    :class="wrapperClass"
    class="flex-1 relative hidden text-input-disabled-border"
  >
    <img
      src="@/assets/icons/input/search-icon.svg"
      alt="Search icon"
      class="absolute top-1/2 -translate-y-1/2 left-3"
    />
    <input
      v-model.trim="searchStore.searchQuery"
      @keyup.enter="searchStore.sendSearchQuery"
      type="text"
      :placeholder="placeholder"
      class="w-full border-b bg-transparent placeholder:text-input-disabled-border h-full ps-10 focus:outline-none"
    />
  </div>
  <div
    v-else
    class="flex gap-4 items-center hover:cursor-pointer"
    @click="searchStore.toggleSearchInputVisibility"
  >
    <img
      src="@/assets/icons/input/search-icon.svg"
      :alt="$t('alts.search_icon')"
      class="hidden md:block"
    />
    <p class="text-xl hidden md:block">{{ $t('dashboard.search.search_by') }}</p>
  </div>
</template>
