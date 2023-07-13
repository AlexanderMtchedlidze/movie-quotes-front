<script setup>
import { Form } from 'vee-validate'
import { defineAsyncComponent, onMounted } from 'vue'
import { useErrorHandling } from '@/hooks/useErrorHandling'
import { useQuotesStore } from '@/stores/quotes'
import { storeToRefs } from 'pinia'
import { useLocalization } from '@/stores/localization'
import { useMoviesStore } from '@/stores/movies'
import { useThumbnailImagePath } from '@/hooks/useFullImagePath'
import { useRouter } from 'vue-router'

const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  }
})

const localizationStore = useLocalization()

const { boldFontClass } = storeToRefs(localizationStore)

const quotesStore = useQuotesStore()

const moviesStore = useMoviesStore()

const { movieRef } = storeToRefs(moviesStore)

const router = useRouter()

const onSubmit = async (values, actions) => {
  const formData = new FormData()
  formData.append('thumbnail', values.thumbnail)

  formData.append('movie_id', props.id)
  formData.append('quote_en', values.quote_en)
  formData.append('quote_ka', values.quote_ka)

  try {
    await quotesStore.handleAddingNewQuote(formData)
    router.push({ name: 'movie' })
  } catch (e) {
    if (e.response && e.response.data && e.response.data.errors) {
      const errors = e.response.data.errors
      useErrorHandling(errors, actions)
    }
  }
}

onMounted(async () => {
  moviesStore.handleGettingMovie(props.id)
})

const DashboardDialog = defineAsyncComponent(() => import('../ui/BaseDashboardDialog.vue'))
const DashboardTextArea = defineAsyncComponent(() => import('../form/DashboardTextArea.vue'))
const DashboardFileInput = defineAsyncComponent(() => import('../form/DashboardFileInput.vue'))
</script>

<template>
  <DashboardDialog
    :title="$t('quote.new_quote')"
    profile-card-spacing="mb-7"
    pb="0"
    @close="moviesStore.toggleNewQuoteDialogVisibility"
  >
    <header>
      <div class="flex justify-start gap-7 mb-10">
        <div
          class="w-64 h-40 bg-center bg-cover rounded-xl"
          :style="{ backgroundImage: `url(${useThumbnailImagePath(movieRef.thumbnail)})` }"
        ></div>
        <div class="flex flex-col items-start gap-5">
          <p class="text-2xl text-creme-brulee text-start">
            {{ movieRef?.movie[localizationStore.locale] }}
          </p>
          <div class="flex gap-2">
            <span
              v-for="genre in movieRef?.genres"
              :key="genre"
              :class="boldFontClass"
              class="py-1.5 px-2.5 text-lg bg-gray-slate rounded-md"
              >{{ genre.genre[localizationStore.locale] }}</span
            >
          </div>
          <span :class="boldFontClass" class="text-lg"
            >{{ $t('movie.director') }}:
            <span class="font-medium">{{
              movieRef?.director[localizationStore.locale]
            }}</span></span
          >
        </div>
      </div>
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
