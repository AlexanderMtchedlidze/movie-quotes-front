<script setup>
import { useMoviesStore } from '@/stores/movies'
import { defineAsyncComponent, onMounted } from 'vue'
import { useLocalization } from '@/stores/localization'
import { useThumbnailImagePath } from '@/hooks/useFullImagePath'
import { storeToRefs } from 'pinia'

const moviesStore = useMoviesStore()

onMounted(async () => {
  await moviesStore.handleGettingUserMovies()
  moviesStore.movieRef = null
})

const localizationStore = useLocalization()

const { mediumFontClass } = storeToRefs(localizationStore)

const DashBoardWrapper = defineAsyncComponent(() =>
  import('@/components/wrapper/DashboardWrapper.vue')
)
const NewMovieDialog = defineAsyncComponent(() => import('@/components/dialog/NewMovieDialog.vue'))
const BaseSearchInput = defineAsyncComponent(() => import('@/components/ui/BaseSearchInput.vue'))
const MovieCard = defineAsyncComponent(() => import('@/components/movies/MoviesCard.vue'))
const AddQuoteOrMovieButton = defineAsyncComponent(() =>
  import('@/components/button/AddQuoteOrMovieButton.vue')
)
</script>

<template>
  <NewMovieDialog />
  <DashBoardWrapper>
    <div class="w-full px-10 pt-8 pb-10">
      <header class="flex justify-between gap-2">
        <p
          :class="mediumFontClass"
          class="flex flex-col gap-1.5 lg:flex-row md:gap-3 text-2xl mr-auto"
        >
          <span>{{ $t('movies_list.my_list_of_movies') }}</span>
          <span class="text-base md:text-2xl">
            ({{ $t('movies_list.total') }} {{ moviesStore.userMoviesCount }})
          </span>
        </p>
        <div class="flex gap-7">
          <BaseSearchInput :placeholder="$t('movies_list.search_movies')" class="hidden xl:flex" />
          <AddQuoteOrMovieButton @click="moviesStore.toggleNewMovieDialogVisibility">
            <span class="text-base md:text-lg whitespace-nowrap">
              {{ $t('movies_list.add_movie') }}
            </span>
          </AddQuoteOrMovieButton>
        </div>
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
