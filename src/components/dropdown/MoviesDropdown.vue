<script setup>
import { defineAsyncComponent, onMounted, ref } from 'vue'
import { useMoviesStore } from '@/stores/movies'
import { useLocalization } from '@/stores/localization'
import { useI18n } from 'vue-i18n'
import { ErrorMessage, Field } from 'vee-validate'

const moviesStore = useMoviesStore()

const localizationStore = useLocalization()

const { t } = useI18n()

onMounted(async () => {
  await moviesStore.handleGettingAllMovies()
})

const buttonText = ref(t('news_feed.form.movies'))

const updateMovie = (movieName, movieId, handleChange) => {
  handleChange(movieId)
  buttonText.value = movieName
}

const DropdownMenu = defineAsyncComponent(() => import('./DropdownMenu.vue'))
const DropdownItem = defineAsyncComponent(() => import('./DropdownItem.vue'))
</script>

<template>
  <div>
    <Field name="moviesDropdown" v-slot="{ handleChange }" rules="required">
      <DropdownMenu class="mb-1">
        <template #trigger>
          <div class="bg-black rounded-lg px-6 py-6 hover:cursor-pointer">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <img
                  src="@/assets/icons/navigation/movies-list-inactive.svg"
                  :alt="$t('alts.camera_icon')"
                />
                <span class="text-white capitalize text-base md:text-2xl">{{ buttonText }}</span>
              </div>
              <div>
                <img
                  src="@/assets/icons/dropdown-vector.svg"
                  :alt="$t('alts.dropdown_arrow_vector')"
                />
              </div>
            </div>
          </div>
        </template>
        <template #default>
          <div class="absolute bg-black px-6 py-2 mt-2 rounded-lg w-full z-50 h-24 overflow-y-auto">
            <div v-if="moviesStore.movies">
              <DropdownItem
                v-for="movie in moviesStore.movies"
                :key="movie.id"
                :id="movie.id"
                :value="movie.id"
                :textContent="movie.movie[localizationStore.locale]"
                @click="updateMovie(movie.movie[localizationStore.locale], movie.id, handleChange)"
              />
            </div>
            <div v-else>
              <DropdownItem :textContent="$t('news_feed.form.no_movies_available')" />
            </div>
          </div>
        </template>
      </DropdownMenu>
    </Field>
    <ErrorMessage name="moviesDropdown" class="text-red-error" />
  </div>
</template>
