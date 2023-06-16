<script setup>
import { computed, defineAsyncComponent, onMounted } from 'vue'
import { useQuotesStore } from '@/stores/quotes'
import { useThumbnailImagePath } from '@/hooks/useFullImagePath'
import { useLocalization } from '../stores/localization'
import { useSearchStore } from '../stores/search'
import { useI18n } from 'vue-i18n'

const quotesStore = useQuotesStore()

const searchButtonClass = computed(() => ({
  'flex-1': !searchStore.isSearchInputVisible
}))

onMounted(async () => {
  await quotesStore.handleGettingAllQuotes()
})

const localizationStore = useLocalization()

const searchStore = useSearchStore()

const { t } = useI18n()
const searchInputPlaceholder = computed(
  () =>
    t('dashboard.search.enter') +
    ' @ ' +
    t('dashboard.search.to_search_movies') +
    ', ' +
    t('dashboard.search.enter') +
    ' # ' +
    t('dashboard.search.to_search_quotes')
)

const NewQuoteDialog = defineAsyncComponent(() => import('@/components/dialog/NewQuoteDialog.vue'))
const BaseSearchInput = defineAsyncComponent(() => import('@/components/ui/BaseSearchInput.vue'))
const DashBoardWrapper = defineAsyncComponent(() =>
  import('@/components/wrapper/DashboardWrapper.vue')
)
const QuoteQard = defineAsyncComponent(() => import('@/components/quotes/QuoteCard.vue'))
</script>

<template>
  <NewQuoteDialog />
  <DashBoardWrapper>
    <div class="w-full lg:w-11/12 xl:w-9/12 px-0 md:px-11 lg:px-0 pb-10 pt-8">
      <header class="md:flex gap-8">
        <ActionButton
          type="tertiary"
          class="flex items-center gap-4 px-9 md:px-4 py-3 text-start border-none md:rounded-xl bg-transparent md:bg-midnight-creme-brulee"
          :class="searchButtonClass"
          @click="quotesStore.toggleNewQuoteDialogVisibility"
        >
          <img src="@/assets/icons/pencil.svg" alt="Pencil icon" />
          <span class="text-base md:text-lg flex-1">
            {{ $t('dashboard.search.write_new_quote') }}
          </span>
        </ActionButton>
        <BaseSearchInput :placeholder="searchInputPlaceholder" />
      </header>
      <div class="flex flex-col gap-10 pt-10 md:pt-5 pb-24">
        <QuoteQard
          v-for="quote in quotesStore.quotes"
          :key="quote.id"
          :id="quote.id"
          :author-name="quote.author.name"
          :author-profile-image-src="quote.author.profile_image"
          :quote="quote.quote[localizationStore.locale]"
          :quote-image-src="useThumbnailImagePath(quote.thumbnail)"
          :movie="quote.movie.movie[localizationStore.locale]"
          :movie-year="quote.movie.year"
          :comments-count="quote.comments_count"
          :comments="quote.comments"
          :likes-count="quote.likes_count"
        />
      </div>
    </div>
  </DashBoardWrapper>
</template>
