<script setup>
import { defineAsyncComponent, reactive } from 'vue'
import { Form } from 'vee-validate'
import { useQuotesStore } from '@/stores/quotes'
import { dashboardFormClass } from '../utils/constants'

const DashboardDialog = defineAsyncComponent(() => import('../ui/BaseDashboardDialog.vue'))
const DashboardTextArea = defineAsyncComponent(() => import('../form/DashboardTextArea.vue'))
const DashboardFileInput = defineAsyncComponent(() => import('../form/DashboardFileInput.vue'))
const MoviesDropdown = defineAsyncComponent(() => import('../dropdown/MoviesDropdown.vue'))

const quotesStore = useQuotesStore()

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

    await quotesStore.handleAddingNewQuote(formData)
  }
}
</script>

<template>
  <DashboardDialog
    title="Write New Quote"
    :show="quotesStore.isNewQuoteDialogVisible"
    @close="quotesStore.toggleNewQuoteDialogVisibility"
  >
    <Form :class="dashboardFormClass" @submit="onSubmit">
      <DashboardTextArea name="quote_en" lang="Eng" placeholder="New quote" />
      <DashboardTextArea name="quote_ka" lang="ქარ" placeholder="ახალი ციტატა" />
      <DashboardFileInput name="thumbnail" v-model="form.thumbnail" />
      <MoviesDropdown v-model="form.movie_id" />
      <ActionButton type="primary" submit>Post</ActionButton>
    </Form>
  </DashboardDialog>
</template>
