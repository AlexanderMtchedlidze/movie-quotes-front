<script setup>
import { defineAsyncComponent } from 'vue'
import { Form } from 'vee-validate'
import { useQuotesStore } from '@/stores/quotes'
import { dashboardFormClass } from '../utils/constants'
import { useErrorHandling } from '@/hooks/useErrorHandling'

defineProps({
  title: {
    type: String,
    required: true
  }
})

const quotesStore = useQuotesStore()

const onSubmit = async (values, actions) => {
  const formData = new FormData()
  formData.append('thumbnail', values.thumbnail)

  formData.append('movie_id', values.moviesDropdown)
  formData.append('quote_en', values.quote_en)
  formData.append('quote_ka', values.quote_ka)

  try {
    await quotesStore.handleAddingNewQuote(formData)
  } catch (e) {
    console.log(e)
    const errors = e.response.data.errors
    useErrorHandling(errors, actions)
  }
}

const DashboardDialog = defineAsyncComponent(() => import('../ui/BaseDashboardDialog.vue'))
const DashboardTextArea = defineAsyncComponent(() => import('../form/DashboardTextArea.vue'))
const DashboardFileInput = defineAsyncComponent(() => import('../form/DashboardFileInput.vue'))
const MoviesDropdown = defineAsyncComponent(() => import('../dropdown/MoviesDropdown.vue'))
</script>

<template>
  <DashboardDialog :title="title" profile-card-spacing="mb-10">
    <Form :class="dashboardFormClass" @submit="onSubmit">
      <DashboardTextArea name="quote_en" lang="Eng" placeholder="New quote" />
      <DashboardTextArea name="quote_ka" lang="ქარ" placeholder="ახალი ციტატა" />
      <DashboardFileInput name="thumbnail" />
      <MoviesDropdown />
      <ActionButton type="primary" submit>{{ $t('news_feed.form.post') }}</ActionButton>
    </Form>
  </DashboardDialog>
</template>
