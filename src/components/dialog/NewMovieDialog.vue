<script setup>
import { Form } from 'vee-validate'
import { useMoviesStore } from '@/stores/movies'
import { useErrorHandling } from '@/hooks/useErrorHandling'
import { dashboardFormClass } from '../utils/constants'
import { ref, defineAsyncComponent } from 'vue'

const moviesStore = useMoviesStore()

const genres = ref([])

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
  formData.append('thumbnail', values.thumbnail)

  try {
    await moviesStore.handleAddingMovie(formData)
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
  <DashboardDialog
    :title="$t('movie.add_movie')"
    :show="moviesStore.newMovieDialogVisibility"
    @close="moviesStore.toggleNewMovieDialogVisibility"
  >
    <Form :class="dashboardFormClass" @submit="onSubmit">
      <DashboardTextInput name="movie_en" lang="Eng" placeholder="Movie name" />
      <DashboardTextInput name="movie_ka" lang="ქარ" placeholder="ფილმის სახელი" />

      <GenresDropdown :genres="genres" />

      <DashboardTextInput name="year" placeholder="წელი/Year" type="number" />

      <DashboardTextInput name="director_en" lang="Eng" placeholder="Director" />
      <DashboardTextInput name="director_ka" lang="ქარ" placeholder="რეჟისორი" />

      <DashboardTextArea
        name="description_en"
        :italic="false"
        lang="Eng"
        placeholder="Movie description"
      />
      <DashboardTextArea
        name="description_ka"
        :italic="false"
        lang="ქარ"
        placeholder="ფილმის აღწერა"
      />

      <DashboardFileInput name="thumbnail" />
      <ActionButton type="primary" submit>{{ $t('movies_list.add_movie') }}</ActionButton>
    </Form>
  </DashboardDialog>
</template>
