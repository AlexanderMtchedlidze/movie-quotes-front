<script setup>
import { storeToRefs } from 'pinia'
import { useMoviesStore } from '@/stores/movies'
import { useQuotesStore } from '@/stores/quotes'
import { onMounted, defineAsyncComponent, computed } from 'vue'
import { useLocalization } from '@/stores/localization'
import { useThumbnailImagePath } from '@/hooks/useFullImagePath'

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})

const moviesStore = useMoviesStore()

const { movieRef } = storeToRefs(moviesStore)

const localizationStore = useLocalization()

const totalIndicatorClass = computed(() => ({
  'ml-1': !localizationStore.isCurrentLocaleKa
}))

const quotesStore = useQuotesStore()

const { mediumFontClass, boldFontClass } = storeToRefs(localizationStore)

onMounted(async () => {
  await refetchMovie()
})

const refetchMovie = async () => {
  await moviesStore.handleGettingMovie(props.id)
}

const DashBoardWrapper = defineAsyncComponent(() =>
  import('@/components/wrapper/DashboardWrapper.vue')
)
const AddQuoteOrMovieButton = defineAsyncComponent(() =>
  import('@/components/button/AddQuoteOrMovieButton.vue')
)
const NarrowQuoteCard = defineAsyncComponent(() =>
  import('@/components/quotes/NarrowQuoteCard.vue')
)
const MovieDescription = defineAsyncComponent(() =>
  import('@/components/movies/MovieDescription.vue')
)
const NewMovieQuoteDialog = defineAsyncComponent(() =>
  import('@/components/dialog/NewMovieQuoteDialog.vue')
)
</script>

<template>
  <NewMovieQuoteDialog
    :title="$t('quote.new_quote')"
    :movie-id="movieRef?.id"
    :show="moviesStore.newQuoteDialogVisibility"
    @close="moviesStore.toggleNewQuoteDialogVisibility"
  >
    <template #header>
      <div class="flex justify-start gap-7 mb-10">
        <img
          :src="useThumbnailImagePath(movieRef.thumbnail)"
          :alt="$t('alts.movie_image')"
          class="w-64 rounded-xl"
        />
        <div class="flex flex-col items-start gap-5">
          <p class="text-2xl text-creme-brulee text-start">
            {{ movieRef.movie[localizationStore.locale] }}
          </p>
          <div class="flex gap-2">
            <span
              v-for="genre in movieRef.genres"
              :key="genre"
              :class="boldFontClass"
              class="py-1.5 px-2.5 text-lg bg-gray-slate rounded-md"
              >{{ genre.genre[localizationStore.locale] }}</span
            >
          </div>
          <span :class="boldFontClass" class="text-lg"
            >{{ $t('movie.director') }}:
            <span class="font-medium">{{ movieRef.director[localizationStore.locale] }}</span></span
          >
        </div>
      </div>
    </template>
  </NewMovieQuoteDialog>

  <DashBoardWrapper gap="sm">
    <div class="w-full pe-0 md:pe-[4.5rem] pb-10 pt-8">
      <header class="mb-8">
        <h1 :class="mediumFontClass" class="text-2xl ml-8 md:ml-0">
          {{ $t('movie.movie_description') }}
        </h1>
      </header>
      <div class="grid grid-cols-5 gap-6">
        <div class="col-span-5 lg:col-span-3">
          <div
            class="mx-8 md:mx-0 bg-center bg-cover h-60 lg:h-[20rem] xl:h-[28rem] rounded-xl"
            :style="{ backgroundImage: `url(${useThumbnailImagePath(movieRef.thumbnail)})` }"
          ></div>
          <div class="mt-8 flex gap-4">
            <span :class="mediumFontClass" class="hidden md:block text-2xl"
              >{{ $t('movie.quotes') }} (<span v-if="!localizationStore.isCurrentLocaleKa">
                {{ $t('movie.total') }}
              </span>
              <span :class="totalIndicatorClass"> {{ movieRef?.quotes_count }}) </span>
            </span>
            <img src="@/assets/icons/line.svg" alt="Vertical line icon" class="hidden md:block" />
            <AddQuoteOrMovieButton
              @click="moviesStore.toggleNewQuoteDialogVisibility"
              class="hidden md:flex whitespace-nowrap"
              >{{ $t('movie.add_quote') }}</AddQuoteOrMovieButton
            >
          </div>
          <MovieDescription
            v-if="movieRef"
            :id="movieRef.id"
            :movie="movieRef.movie[localizationStore.locale]"
            :year="movieRef.year"
            :genres="movieRef.genres.map((g) => g.genre[localizationStore.locale])"
            :director="movieRef.director[localizationStore.locale]"
            :description="movieRef.description[localizationStore.locale]"
            class="block lg:hidden"
          />
          <AddQuoteOrMovieButton
            @click="moviesStore.toggleNewQuoteDialogVisibility"
            class="flex md:hidden mt-8 ml-8"
            >{{ $t('movie.add_quote') }}</AddQuoteOrMovieButton
          >
          <div class="block md:hidden px-8">
            <div class="border border-[#EFEFEF]/20 mt-8"></div>
            <p class="text-2xl mb-1 mt-10">{{ $t('movie.quotes') }}</p>
            <p>({{ $t('movie.total') }} {{ movieRef?.quotes_count }})</p>
          </div>
          <div class="py-14 flex flex-col gap-10">
            <div
              class="bg-midnight-blue rounded-none md:rounded-xl py-5 md:py-6 px-8 flex flex-col gap-8 md:gap-6"
              v-for="quote in movieRef?.quotes"
              :key="quote.id"
            >
              <NarrowQuoteCard
                :id="quote.id"
                :thumbnail="useThumbnailImagePath(quote.thumbnail)"
                :quoteText="quote.quote[localizationStore.locale]"
                :comments-count="quote.comments_count"
                :likes-count="quote.likes_count"
                :is-user-in-quote-likes="quotesStore.isUserInQuoteLikes(quote.id)"
              />
            </div>
          </div>
        </div>
        <MovieDescription
          v-if="movieRef"
          :id="movieRef.id"
          :movie="movieRef.movie[localizationStore.locale]"
          :year="movieRef.year"
          :genres="movieRef.genres.map((g) => g.genre[localizationStore.locale])"
          :director="movieRef.director[localizationStore.locale]"
          :description="movieRef.description[localizationStore.locale]"
          class="hidden lg:block col-span-2"
        />
      </div>
    </div>
  </DashBoardWrapper>
</template>
