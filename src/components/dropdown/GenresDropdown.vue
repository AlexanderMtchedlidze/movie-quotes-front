<script setup>
import { defineAsyncComponent, onMounted } from 'vue'
import { useGenresStore } from '@/stores/genres'
import { ErrorMessage, Field } from 'vee-validate'
import { useLocalization } from '@/stores/localization'

const props = defineProps({
  genres: {
    type: Array,
    required: true
  },
  required: {
    type: Boolean,
    required: false,
    default: true
  }
})

const genresStore = useGenresStore()

const localizationStore = useLocalization()

onMounted(async () => {
  await genresStore.handleGettingAllGenres(props.genres)
})

const updateGenre = (genre, genreId, handleChange) => {
  const genres = genresStore.pushGenreToSelectedGenres(genre, genreId, props.genres)
  handleChange(genres)
}

const removeGenre = (genreId, handleChange) => {
  const genres = genresStore.removeGenreFromSelectedGenres(genreId, props.genres)
  handleChange(genres ?? [])
}

const DropdownMenu = defineAsyncComponent(() => import('./DropdownMenu.vue'))
const DropdownItem = defineAsyncComponent(() => import('./DropdownItem.vue'))
</script>

<template>
  <div>
    <Field name="genresDropdown" v-slot="{ handleChange }" :rules="{ required: required }">
      <DropdownMenu class="mb-1" :close-on-select="false">
        <template #trigger>
          <div
            class="w-full bg-transparent border border-gray-slate rounded px-3 md:px-4 py-2 md:py-2.5 hover:cursor-pointer"
          >
            <div class="flex flex-wrap flex-row gap-1 text-sm md:text-xl">
              <div v-for="genre in genres" :key="genre">
                <p class="bg-gray-slate rounded-sm flex items-center gap-2 py-1.5 px-2">
                  {{ genre.genre[localizationStore.locale] }}
                  <img
                    src="@/assets/icons/white-crossing.svg"
                    :alt="$t('alts.white_crossing_icon')"
                    class="w-2 h-2"
                    @click.stop="removeGenre(genre.id, handleChange)"
                  />
                </p>
              </div>

              <span v-if="!genres.length">{{ $t('movies_list.genres') }}</span>
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
                :textContent="genre.genre[localizationStore.locale]"
                @click="updateGenre(genre.genre, genre.id, handleChange)"
              />
            </div>
            <div v-else>
              <DropdownItem :textContent="$t('movies_list.no_genres_available')" />
            </div>
          </div>
        </template>
      </DropdownMenu>
    </Field>
    <ErrorMessage name="genresDropdown" class="text-red-error" />
  </div>
</template>
