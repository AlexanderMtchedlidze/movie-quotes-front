<script setup>
import { Form } from 'vee-validate'
import { useRouter, useRoute } from 'vue-router'
import { defineAsyncComponent, ref, onMounted } from 'vue'
import { useMoviesStore } from '@/stores/movies'
import { dashboardFormClass } from '../utils/constants'
import { useErrorHandling } from '@/hooks/useErrorHandling'

import { useLocalization } from '@/stores/localization'
import { storeToRefs } from 'pinia'

const localizationStore = useLocalization()

const { boldFontClass } = storeToRefs(localizationStore)

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})

const moviesStore = useMoviesStore()

const { movieRef } = storeToRefs(moviesStore)

onMounted(async () => {
  moviesStore.handleGettingMovie(props.id)
})

const initialValues = {
  movie_en: movieRef.value.movie.en,
  movie_ka: movieRef.value.movie.ka,
  year: movieRef.value.year,
  budget: movieRef.value.budget,
  genresDropdown: movieRef.value.genres,
  director_en: movieRef.value.director.en,
  director_ka: movieRef.value.director.ka,
  description_en: movieRef.value.description.en,
  description_ka: movieRef.value.description.ka
}

let imagePlaceholder = ref('/movie-frame.png')
const updateImagePlaceholder = (image) => {
  const reader = new FileReader()
  reader.onload = () => {
    imagePlaceholder.value = reader.result
  }
  reader.readAsDataURL(image)
}

const onSubmit = async (values, actions) => {
  const formData = new FormData()
  formData.append('movie_en', values.movie_en)
  formData.append('movie_ka', values.movie_ka)

  if (values.genresDropdown) {
    values.genresDropdown.forEach((genre, index) => {
      formData.append(`genre_ids[${index}]`, genre.id)
    })
  }

  formData.append('description_en', values.description_en)
  formData.append('description_ka', values.description_ka)
  formData.append('year', values.year)
  formData.append('budget', values.budget)
  formData.append('director_en', values.director_en)
  formData.append('director_ka', values.director_ka)

  if (values.thumbnail) formData.append('thumbnail', values.thumbnail)

  try {
    await moviesStore.handleEditingMovie(props.id, formData)
    toggleEditDialogVisibility()
  } catch (e) {
    const errors = e.response.data.errors
    useErrorHandling(errors, actions)
  }
}

const route = useRoute()
const router = useRouter()

const toggleEditDialogVisibility = () => {
  route.name === 'editMovieDialog'
    ? router.push({ name: 'movie' })
    : router.push({ name: 'editMovieDialog' })
}

const DashboardDialog = defineAsyncComponent(() => import('../ui/BaseDashboardDialog.vue'))
const DashboardTextInput = defineAsyncComponent(() => import('../form/DashboardTextInput.vue'))
const DashboardTextArea = defineAsyncComponent(() => import('../form/DashboardTextArea.vue'))
const DashboardFileInput = defineAsyncComponent(() => import('../form/DashboardFileInput.vue'))
const GenresDropdown = defineAsyncComponent(() => import('../dropdown/GenresDropdown.vue'))
</script>

<template>
  <DashboardDialog @close="toggleEditDialogVisibility" :title="$t('movie.edit_movie')">
    <Form :class="dashboardFormClass" @submit="onSubmit" :initial-values="initialValues">
      <DashboardTextInput label="Movie name" name="movie_en" lang="Eng" placeholder="Movie name" />
      <DashboardTextInput
        label="ფილმის სახელი"
        name="movie_ka"
        lang="ქარ"
        placeholder="ფილმის სახელი"
      />

      <GenresDropdown :genres="movieRef.genres" :required="false" />

      <DashboardTextInput label="წელი/year" name="year" placeholder="წელი/Year" type="number" />

      <DashboardTextInput
        label="ბიუჯეტი/Budget"
        name="budget"
        placeholder="ბიუჯეტი/Budget"
        type="number"
      />

      <DashboardTextInput label="director" name="director_en" lang="Eng" placeholder="Director" />
      <DashboardTextInput label="რეჟისორი" name="director_ka" lang="ქარ" placeholder="რეჟისორი" />

      <DashboardTextArea
        label="description"
        name="description_en"
        :italic="false"
        lang="Eng"
        placeholder="Movie description"
      />
      <DashboardTextArea
        label="აღწერა"
        name="description_ka"
        :italic="false"
        lang="ქარ"
        placeholder="ფილმის აღწერა"
      />

      <div
        class="flex justify-normal sm:justify-between gap-4 xl:gap-0 py-4 px-4 md:px-6 border border-gray-slate rounded-xl"
      >
        <div
          :style="{ backgroundImage: `url(${imagePlaceholder})` }"
          class="w-1/2 max-h-full bg-cover bg-center"
        ></div>
        <DashboardFileInput
          @update:model-value="updateImagePlaceholder"
          flex-structure="col"
          name="thumbnail"
        >
          <h4 :class="boldFontClass" class="text-creme-brulee uppercase">
            {{ $t('movie.replace_photo') }}
          </h4>
          <div>
            <div class="gap-2 items-center hidden 2xl:flex">
              <img src="@/assets/icons/input/camera.svg" :alt="$t('alts.camera_icon')" />

              <span class="hidden md:block">{{ $t('news_feed.form.drag_n_drop_your_image') }}</span>
              <span class="block md:hidden">{{ $t('news_feed.form.choose_your_file') }}</span>
            </div>
          </div>
        </DashboardFileInput>
      </div>
      <ActionButton type="primary" submit>{{ $t('movie.save_changes') }}</ActionButton>
    </Form>
  </DashboardDialog>
</template>
