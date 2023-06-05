<script setup>
import { ref, defineAsyncComponent, onMounted } from 'vue'
import { useQuotesStore } from '@/stores/quotes'
import { useThumbnailImagePath } from '@/hooks/useFullImagePath'
import { useLocalization } from '../stores/localization'

const quotesStore = useQuotesStore()

onMounted(async () => {
  await quotesStore.handleGettingAllQuotes()
})

const searchQuery = ref('')

const isSearchingQuote = (prefix) => prefix === '#'
const isSearchingMovie = (prefix) => prefix === '@'

const sendSearchQuery = async () => {
  let query = searchQuery.value
  const prefix = query[0]

  if (isSearchingQuote(prefix) || isSearchingMovie(prefix)) {
    query = query.slice(1)

    if (query.length > 0) {
      await quotesStore.handleFilteringQuotes(query, isSearchingQuote(prefix) ? 'quotes' : 'movies')
    }
  } else {
    await quotesStore.handleGettingAllQuotes()
  }
}

const localizationStore = useLocalization()

const quoteTextContent = (quote) => quote[localizationStore.locale]

const movieTextContent = (movie) => movie[localizationStore.locale]

const NewQuoteDialog = defineAsyncComponent(() => import('../components/dialog/NewQuoteDialog.vue'))
const DashBoardWrapper = defineAsyncComponent(() =>
  import('../components/wrapper/DashboardWrapper.vue')
)
const QuoteQard = defineAsyncComponent(() => import('../components/quotes/QuoteCard.vue'))
</script>

<template>
  <NewQuoteDialog />
  <DashBoardWrapper>
    <div class="w-full lg:w-11/12 xl:w-9/12 px-0 md:px-11 lg:px-0">
      <header class="flex gap-2">
        <ActionButton
          type="tertiary"
          class="flex gap-4 px-9 md:px-4 py-3 text-start border-none md:rounded-xl bg-transparent md:bg-midnight-creme-brulee"
          @click="quotesStore.toggleNewQuoteDialogVisibility"
        >
          <img src="@/assets/icons/pencil.svg" alt="Pencil icon" />
          <span class="text-base md:text-lg"> Write new quote </span>
        </ActionButton>
        <div class="flex-1 relative hidden md:block text-input-disabled-border">
          <input
            v-model.trim="searchQuery"
            @keyup.enter="sendSearchQuery"
            type="text"
            placeholder="Enter @ to search movies, Enter # to search quotes "
            class="w-full border-b bg-transparent placeholder:text-input-disabled-border h-full ps-10 focus:outline-none"
          />
          <img
            src="@/assets/icons/input/search-icon.svg"
            alt="Search icon"
            class="absolute top-1/2 -translate-y-1/2 left-3"
          />
        </div>
      </header>
      <div class="flex flex-col gap-10 pt-10 md:pt-5 pb-10">
        <QuoteQard
          v-for="quote in quotesStore.quotes"
          :key="quote.id"
          :id="quote.id"
          :author-name="quote.author.name"
          :author-profile-image-src="quote.author.profile_image"
          :quote="quoteTextContent(quote.quote)"
          :quote-image-src="useThumbnailImagePath(quote.thumbnail)"
          :movie="movieTextContent(quote.movie.movie)"
          :comments-count="quote.comments_count"
          :comments="quote.comments"
          :likes-count="quote.likes_count"
        />
      </div>
    </div>
  </DashBoardWrapper>
</template>
