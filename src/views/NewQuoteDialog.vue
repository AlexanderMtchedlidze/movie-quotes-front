<script setup>
import { Form } from 'vee-validate'
import { defineAsyncComponent } from 'vue'
import { useQuotesStore } from '@/stores/quotes'
import { dashboardFormClass } from '@/components/utils/constants'
import { useErrorHandling } from '@/hooks/useErrorHandling'
import { useRouter } from 'vue-router'

const quotesStore = useQuotesStore()

const router = useRouter()
const onSubmit = async (values, actions) => {
  const formData = new FormData()
  formData.append('thumbnail', values.thumbnail)

  formData.append('movie_id', values.moviesDropdown)
  formData.append('quote_en', values.quote_en)
  formData.append('quote_ka', values.quote_ka)

  try {
    await quotesStore.handleAddingNewQuote(formData)
    router.push({ name: 'newsFeed' })
  } catch (e) {
    const errors = e.response.data.errors
    useErrorHandling(errors, actions)
  }
}

const DashboardDialog = defineAsyncComponent(() =>
  import('@/components/ui/BaseDashboardDialog.vue')
)
const DashboardTextArea = defineAsyncComponent(() =>
  import('@/components/form/DashboardTextArea.vue')
)
const DashboardFileInput = defineAsyncComponent(() =>
  import('@/components/form/DashboardFileInput.vue')
)
const MoviesDropdown = defineAsyncComponent(() =>
  import('@/components/dropdown/MoviesDropdown.vue')
)
</script>

<template>
  <DashboardDialog
    @close="quotesStore.toggleNewQuoteDialogVisibility"
    :title="$t('news_feed.form.write_new_quote')"
    profile-card-spacing="mb-10"
  >
    <Form :class="dashboardFormClass" @submit="onSubmit">
      <DashboardTextArea name="quote_en" lang="Eng" placeholder="New quote" />
      <DashboardTextArea name="quote_ka" lang="ქარ" placeholder="ახალი ციტატა" />
      <DashboardFileInput name="thumbnail" />
      <MoviesDropdown />
      <ActionButton type="primary" submit>{{ $t('news_feed.form.post') }}</ActionButton>
    </Form>
  </DashboardDialog>
</template>
