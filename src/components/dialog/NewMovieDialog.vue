<script setup>
import { defineAsyncComponent, reactive } from 'vue'
import { Form } from 'vee-validate'
import { useMoviesStore } from '@/stores/movies'
import { dashboardFormClass } from '../utils/constants'

const DashboardDialog = defineAsyncComponent(() => import('../ui/BaseDashboardDialog.vue'))
const DashboardTextInput = defineAsyncComponent(() => import('../form/DashboardTextInput.vue'))
const DashboardTextArea = defineAsyncComponent(() => import('../form/DashboardTextArea.vue'))
const DashboardFileInput = defineAsyncComponent(() => import('../form/DashboardFileInput.vue'))

const moviesStore = useMoviesStore()

const form = reactive({
  thumbnail: null,
  movie_id: null
})

const onSubmit = async (values) => {
  if (form.thumbnail && form.movie_id) {
    const formData = new FormData()
    formData.append('thumbnail', form.thumbnail)
    formData.append('movie_id', form.movie_id)
    formData.append('quote_en', values.quote_en)
    formData.append('quote_ka', values.quote_ka)
  }
}
</script>

<template>
  <DashboardDialog
    title="Add Movie"
    :show="moviesStore.newMovieDialogVisibility"
    @close="moviesStore.toggleNewMovieDialogVisibility"
  >
    <Form :class="dashboardFormClass" @submit="onSubmit">
      <DashboardTextInput name="movie_en" lang="Eng" placeholder="Movie name" />
      <DashboardTextInput name="movie_ka" lang="ქარ" placeholder="ფილმის სახელი" />

      <DashboardTextInput name="year" placeholder="წელი/Year" />


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

      <DashboardFileInput name="thumbnail" v-model="form.thumbnail" />
      <ActionButton type="primary" submit>{{ $t('movies_list.add_movie') }}</ActionButton>
    </Form>
  </DashboardDialog>
</template>
