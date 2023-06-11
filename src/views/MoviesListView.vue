<script setup>
import { defineAsyncComponent, onMounted } from 'vue'
import { useMoviesStore } from '@/stores/movies'
import { useThumbnailImagePath } from '@/hooks/useFullImagePath'
import { useLocalization } from '../stores/localization'
import { useSearchStore } from '../stores/search'

const moviesStore = useMoviesStore()

onMounted(async () => {
  await moviesStore.handleGettingUserMovies()
})

const localizationStore = useLocalization()

const searchStore = useSearchStore()

const DashBoardWrapper = defineAsyncComponent(() =>
  import('../components/wrapper/DashboardWrapper.vue')
)
const MovieCard = defineAsyncComponent(() => import('../components/movies/MoviesCard.vue'))
</script>

<template>
  <DashBoardWrapper>
    <div class="w-full px-10 pb-10">
      <header class="flex justify-between gap-2">
        <p class="font-medium text-2xl">
          <span> My list of movies </span>
          <span> (Total {{ moviesStore.userMovies.length }}) </span>
        </p>
        <button
          class="bg-red hover:bg-red-hover active:bg-red-active flex items-center gap-4 px-9 md:px-4 py-2.5 text-start border-none rounded"
        >
          <img src="@/assets/icons/cross.svg" alt="Cross icon" />
          <span class="text-base md:text-lg"> Add movie </span>
        </button>
      </header>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12 flex-col mt-12 md:pt-5 pb-10">
        <MovieCard
          v-for="movie in moviesStore.userMovies"
          :key="movie.id"
          :id="movie.id"
          :movie="movie.movie[localizationStore.locale]"
          :movie-image-src="useThumbnailImagePath(movie.thumbnail)"
          :quotes-count="movie.quotes_count"
        />
      </div>
    </div>
  </DashBoardWrapper>
</template>
