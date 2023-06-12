<script setup>
import { defineAsyncComponent, onMounted, ref } from 'vue'
import { useMoviesStore } from '@/stores/movies'
import { useLocalization } from '@/stores/localization'
import { useI18n } from 'vue-i18n'

const emit = defineEmits(['update:modelValue'])

const Dropdown = defineAsyncComponent(() => import('./Dropdown.vue'))
const DropdownItem = defineAsyncComponent(() => import('./DropdownItem.vue'))

const moviesStore = useMoviesStore()

const localizationStore = useLocalization()

const { t } = useI18n()

onMounted(async () => {
  await moviesStore.handleGettingAllMovies()
})

const buttonText = ref(t('news_feed.form.movies'))

const updateMovie = (movieName, movieId) => {
  emit('update:modelValue', movieId)
  buttonText.value = movieName
}
</script>

<template>
  <Dropdown>
    <template #trigger>
      <div class="bg-black rounded-lg px-6 py-6 hover:cursor-pointer">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <img src="@/assets/icons/navigation/movies-list-inactive.svg" alt="Camera icon" />
            <span class="text-white capitalize text-base md:text-2xl">{{ buttonText }}</span>
          </div>
          <div>
            <img src="@/assets/icons/dropdown-vector.svg" alt="Dropdown arrow vector" />
          </div>
        </div>
      </div>
    </template>
    <template #default>
      <div class="absolute bg-black px-6 py-2 mt-2 rounded-lg w-full z-50 h-24 overflow-y-auto">
        <DropdownItem
          v-for="movie in moviesStore.movies"
          :key="movie.id"
          :id="movie.id"
          :value="movie.id"
          :textContent="movie.movie[localizationStore.locale]"
          @click="updateMovie(movie.movie[localizationStore.locale], movie.id)"
        />
      </div>
    </template>
  </Dropdown>
</template>
