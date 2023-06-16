<script setup>
import { onMounted, defineAsyncComponent } from 'vue'
import { useMoviesStore } from '@/stores/movies'
import { storeToRefs } from 'pinia'
import { useLocalization } from '../stores/localization'
import { useThumbnailImagePath } from '@/hooks/useFullImagePath'

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})

const moviesStore = useMoviesStore()
const { movieRef } = storeToRefs(moviesStore)

onMounted(async () => {
  await moviesStore.handleGettingMovie(props.id)
})

const localizationStore = useLocalization()

const DashBoardWrapper = defineAsyncComponent(() =>
  import('../components/wrapper/DashboardWrapper.vue')
)
const AddQuoteOrMovieButton = defineAsyncComponent(() =>
  import('../components/button/AddQuoteOrMovieButton.vue')
)
const NarrowQuoteCard = defineAsyncComponent(() =>
  import('../components/quotes/NarrowQuoteCard.vue')
)
const MovieDescription = defineAsyncComponent(() =>
  import('../components/movies/MovieDescription.vue')
)
</script>

<template>
  <DashBoardWrapper gap="sm">
    <div class="w-full pe-0 md:pe-[4.5rem] pb-10 pt-8">
      <header class="mb-8">
        <h1 class="text-2xl font-medium ml-8 md:ml-0">Movie description</h1>
      </header>
      <div class="grid grid-cols-5 gap-6">
        <div class="col-span-5 lg:col-span-3">
          <div class="px-8 md:px-0 ">
            <img
              :src="useThumbnailImagePath(movieRef.thumbnail)"
              alt="Movie thumbnail"
              class="rounded-xl"
            />
          </div>
          <div class="mt-8 flex gap-4">
            <span class="hidden md:block text-2xl font-medium"
              >Quotes (total {{ movieRef.quotes_count }})</span
            >
            <img src="@/assets/icons/line.svg" alt="Vertical line icon" class="hidden md:block" />
            <AddQuoteOrMovieButton class="hidden md:flex">Add Quote</AddQuoteOrMovieButton>
          </div>
          <MovieDescription
            class="block lg:hidden px-8 md:px-0"
            :movie="movieRef.movie[localizationStore.locale]"
            :year="movieRef.year"
            :genres="movieRef.genres"
            :director="movieRef.director[localizationStore.locale]"
            :description="movieRef.description[localizationStore.locale]"
          />
          <AddQuoteOrMovieButton class="flex md:hidden mt-8 ml-8">Add Quote</AddQuoteOrMovieButton>
          <div class="block md:hidden px-8">
            <div class="border border-[#EFEFEF]/20 mt-8"></div>
            <p class="text-2xl mb-1 mt-10">All Quotes</p>
            <p>(Total {{ movieRef.quotes_count }})</p>
          </div>
          <div class="py-14 flex flex-col gap-10">
            <div
              class="bg-midnight-blue rounded-none md:rounded-xl py-5 md:py-6 px-8 flex flex-col gap-8 md:gap-6"
              v-for="quote in movieRef.quotes"
              :key="quote.id"
            >
              <NarrowQuoteCard
                :thumbnail="useThumbnailImagePath(quote.thumbnail)"
                :quote="quote.quote[localizationStore.locale]"
                :comments-count="quote.comments_count"
                :likes-count="quote.likes_count"
              />
            </div>
          </div>
        </div>
        <MovieDescription
          class="hidden lg:block col-span-2"
          :movie="movieRef.movie[localizationStore.locale]"
          :year="movieRef.year"
          :genres="movieRef.genres"
          :director="movieRef.director[localizationStore.locale]"
          :description="movieRef.description[localizationStore.locale]"
        />
      </div>
    </div>
  </DashBoardWrapper>
</template>
