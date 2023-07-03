<script setup>
import { Form } from 'vee-validate'
import { defineAsyncComponent } from 'vue'
import { useErrorHandling } from '@/hooks/useErrorHandling'
import { useQuotesStore } from '@/stores/quotes'

const props = defineProps({
  movieId: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  }
})

const quotesStore = useQuotesStore()

const onSubmit = async (values, actions) => {
  const formData = new FormData()
  formData.append('thumbnail', values.thumbnail)

  formData.append('movie_id', props.movieId)
  formData.append('quote_en', values.quote_en)
  formData.append('quote_ka', values.quote_ka)

  try {
    await quotesStore.handleAddingNewQuote(formData)
  } catch (e) {
    if (e.response && e.response.data && e.response.data.errors) {
      const errors = e.response.data.errors
      useErrorHandling(errors, actions)
    }
  }
}

const DashboardDialog = defineAsyncComponent(() => import('../ui/BaseDashboardDialog.vue'))
const DashboardTextArea = defineAsyncComponent(() => import('../form/DashboardTextArea.vue'))
const DashboardFileInput = defineAsyncComponent(() => import('../form/DashboardFileInput.vue'))
</script>

<template>
  <DashboardDialog :title="title" profile-card-spacing="mb-7" pb="0">
    <header>
      <slot name="header"></slot>
    </header>
    <Form @submit="onSubmit" class="text-left">
      <DashboardFileInput name="thumbnail" class="block md:hidden" />
      <DashboardTextArea
        name="quote_en"
        lang="Eng"
        placeholder="New quote"
        :inverse="true"
        class="mt-4 md:mt-0"
      />
      <DashboardTextArea
        name="quote_ka"
        lang="ქარ"
        placeholder="ახალი ციტატა"
        :inverse="true"
        class="mt-2 md:mt-6"
      />
      <DashboardFileInput name="thumbnail" class="mt-10 hidden md:block" />
      <ActionButton type="primary" submit class="w-full mt-16">{{
        $t('quote.post_quote')
      }}</ActionButton>
    </Form>
  </DashboardDialog>
</template>
