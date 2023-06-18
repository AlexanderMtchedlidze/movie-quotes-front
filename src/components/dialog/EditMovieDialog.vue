<script setup>
import { defineAsyncComponent, ref } from 'vue'
import { Form } from 'vee-validate'
import { useMoviesStore } from '@/stores/movies'
import { dashboardFormClass } from '../utils/constants'
import { useErrorHandling } from '@/hooks/useErrorHandling'

const emit = defineEmits(['closeEditDialog'])

const props = defineProps({
  show: {
    type: Boolean
  },
  id: {
    type: Number,
    required: true
  },
  movie_en: {
    type: String,
    required: true
  },
  movie_ka: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  genres: {
    type: Array,
    required: true
  },
  director_en: {
    type: String,
    required: true
  },
  director_ka: {
    type: String,
    required: true
  },
  description_en: {
    type: String,
    required: true
  },
  description_ka: {
    type: String,
    required: true
  }
})

const initialValues = {
  movie_en: props.movie_en,
  movie_ka: props.movie_ka,
  year: props.year,
  genresDropdown: props.genres,
  director_en: props.director_en,
  director_ka: props.director_ka,
  description_en: props.description_en,
  description_ka: props.description_ka
}

const moviesStore = useMoviesStore()

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

  values.genresDropdown.forEach((genre, index) => {
    formData.append(`genre_ids[${index}]`, genre.id)
  })

  formData.append('description_en', values.description_en)
  formData.append('description_ka', values.description_ka)
  formData.append('year', values.year)
  formData.append('director_en', values.director_en)
  formData.append('director_ka', values.director_ka)

  if (values.thumbnail) formData.append('thumbnail', values.thumbnail)

  try {
    await moviesStore.handleEditingMovie(props.id, formData)
    emit('closeEditDialog')
  } catch (e) {
    const errors = e.response.data.errors
    useErrorHandling(errors, actions)
  }
}

const DashboardDialog = defineAsyncComponent(() => import('../ui/BaseDashboardDialog.vue'))
const DashboardTextInput = defineAsyncComponent(() => import('../form/DashboardTextInput.vue'))
const DashboardTextArea = defineAsyncComponent(() => import('../form/DashboardTextArea.vue'))
const DashboardFileInput = defineAsyncComponent(() => import('../form/DashboardFileInput.vue'))
const GenresDropdown = defineAsyncComponent(() => import('../dropdown/GenresDropdown.vue'))
</script>

<template>
  <DashboardDialog :show="show" @close="emit('closeEditDialog')" :title="$t('movie.edit_movie')">
    <Form :class="dashboardFormClass" @submit="onSubmit" :initial-values="initialValues">
      <DashboardTextInput label="Movie name" name="movie_en" lang="Eng" placeholder="Movie name" />
      <DashboardTextInput
        label="ფილმის სახელი"
        name="movie_ka"
        lang="ქარ"
        placeholder="ფილმის სახელი"
      />

      <GenresDropdown :genres="genres" />

      <DashboardTextInput label="წელი/year" name="year" placeholder="წელი/Year" type="number" />

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
        <img :src="imagePlaceholder" :alt="$t('alts.movie_frame')" class="w-6/12" />
        <DashboardFileInput
          @update:model-value="updateImagePlaceholder"
          flex-structure="col"
          name="thumbnail"
        >
          <h4 class="text-creme-brulee uppercase font-bold">{{ $t('movie.replace_photo') }}</h4>
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
