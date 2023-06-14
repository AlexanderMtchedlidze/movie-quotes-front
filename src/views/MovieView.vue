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
</script>

<template>
  <DashBoardWrapper>
    <div class="w-full px-10 md:pe-[4.5rem] md:px-0 pb-10 pt-8">
      <header class="mb-8">
        <h1 class="text-2xl font-medium">Movie description</h1>
      </header>
      <div class="grid grid-cols-3 gap-6">
        <div class="col-span-2">
          <img
            :src="useThumbnailImagePath(movieRef.thumbnail)"
            alt="Movie thumbnail"
            class="rounded-xl"
          />
          <div class="mt-8 flex gap-4">
            <span class="text-2xl font-medium">Quotes (total {{ movieRef.quotes_count }})</span>
            <img src="@/assets/icons/line.svg" alt="Vertical line icon" />
            <AddQuoteOrMovieButton>Add Quote</AddQuoteOrMovieButton>
          </div>
          <div class="py-14 flex flex-col gap-10">
            <div
              class="bg-midnight-blue rounded-xl py-6 px-8 flex flex-col gap-6"
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
        <div class="col-span-1">
          <header class="flex justify-between items-center">
            <h3 class="font-medium text-2xl text-creme-brulee">
              {{ movieRef.movie[localizationStore.locale] }}
              <span> ({{ movieRef.year }}) </span>
            </h3>
            <div class="bg-midnight-creme-brulee rounded-lg py-2 px-7 flex gap-6">
              <img
                src="@/assets/icons/borderless-pencil.svg"
                alt="Pencil icon"
                class="hover:cursor-pointer"
              />
              <img src="@/assets/icons/line.svg" alt="Line icon" />
              <img
                src="@/assets/icons/trash-can.svg"
                alt="Trach can icon"
                class="hover:cursor-pointer"
              />
            </div>
          </header>
          <div class="mt-6 flex gap-2">
            <span
              v-for="genre in movieRef.genres"
              :key="genre"
              class="font-bold text-lg py-1.5 px-2.5 rounded-[4px] bg-gray-slate"
              >{{ genre.genre }}</span
            >
          </div>
          <div class="mt-5">
            <span class="text-input-disabled-border font-bold text-lg">Director: </span>
            <span class="font-medium ml-2.5">{{
              movieRef.director[localizationStore.locale]
            }}</span>
          </div>
          <div class="mt-5">
            <p class="text-lg text-input-disabled-border">
              {{ movieRef.description[localizationStore.locale] }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </DashBoardWrapper>
</template>
