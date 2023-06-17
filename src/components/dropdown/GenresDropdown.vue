<script setup>
import { defineAsyncComponent, onMounted } from 'vue'
import { useGenresStore } from '@/stores/genres'
import { ErrorMessage, Field } from 'vee-validate'

const props = defineProps({
  genres: {
    type: Array,
    required: false
  }
})

const genresStore = useGenresStore()

onMounted(async () => {
  await genresStore.handleGettingAllGenres(props.genres)
})

const updateGenre = (genre, genreId, handleChange) => {
  const genres = genresStore.pushGenreToSelectedGenres(genre, genreId)
  handleChange(genres.value)
}

const removeGenre = (genreId, handleChange) => {
  const genres = genresStore.removeGenreFromSelectedGenres(genreId)
  handleChange(genres?.value ?? [])
}

const Dropdown = defineAsyncComponent(() => import('./Dropdown.vue'))
const DropdownItem = defineAsyncComponent(() => import('./DropdownItem.vue'))
</script>

<template>
  <div>
    <Field name="genresDropdown" v-slot="{ handleChange }" rules="required">
      <Dropdown class="mb-1" :close-on-select="false">
        <template #trigger>
          <div
            class="w-full bg-transparent border border-gray-slate rounded px-3 md:px-4 py-2 md:py-2.5 hover:cursor-pointer"
          >
            <div class="flex flex-wrap flex-row gap-1 text-sm md:text-xl">
              <div v-for="genre in genresStore.selectedGenres" :key="genre">
                <p class="bg-gray-slate rounded-sm flex items-center gap-2 py-1.5 px-2"
                  >{{ genre.genre }}
                  <img
                    src="@/assets/icons/white-crossing.svg"
                    :alt="$t('alts.white_crossing_icon')"
                    class="w-2 h-2"
                    @click.stop="removeGenre(genre.id, handleChange)"
                /></p>
              </div>

              <span v-if="!genresStore.selectedGenres?.length">{{ $t('movies_list.genres') }}</span>
            </div>
          </div>
        </template>
        <template #default>
          <div
            class="absolute bg-midnight-blue px-6 py-2 mt-2 rounded-lg w-full z-50 h-24 overflow-y-auto"
          >
            <div v-if="genresStore.allGenres?.length">
              <DropdownItem
                v-for="genre in genresStore.allGenres"
                :key="genre.id"
                :id="genre.id"
                :value="genre.id"
                :textContent="genre.genre"
                @click="updateGenre(genre.genre, genre.id, handleChange)"
              />
            </div>
            <div v-else>
              <DropdownItem :textContent="$t('movies_list.no_genres_available')" />
            </div>
          </div>
        </template>
      </Dropdown>
    </Field>
    <ErrorMessage name="genresDropdown" class="text-red-error" />
  </div>
</template>
