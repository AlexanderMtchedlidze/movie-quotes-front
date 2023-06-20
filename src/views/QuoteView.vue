<script setup>
import { defineAsyncComponent, onMounted } from 'vue'
import { useQuotesStore } from '@/stores/quotes'
import { useThumbnailImagePath } from '@/hooks/useFullImagePath'
import { useLocalization } from '../stores/localization'
import { storeToRefs } from 'pinia'

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})

const quotesStore = useQuotesStore()

const { quote } = storeToRefs(quotesStore)

const localizationStore = useLocalization()

onMounted(async () => {
  await quotesStore.handleGettingQuote(props.id)
})

const DashboardWrapper = defineAsyncComponent(() =>
  import('@/components/wrapper/DashboardWrapper.vue')
)
const QuoteQard = defineAsyncComponent(() => import('@/components/quotes/QuoteCard.vue'))
</script>

<template>
  <DashboardWrapper>
    <div class="w-full lg:w-11/12 xl:w-9/12 px-0 md:px-11 lg:px-0 pt-4">
      <div v-if="quote" class="md:pt-5 pb-24">
        <QuoteQard
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
  </DashboardWrapper>
</template>
