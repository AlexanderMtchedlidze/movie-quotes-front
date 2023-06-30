<script setup>
import { Form, Field } from 'vee-validate'
import { defineAsyncComponent } from 'vue'
import { useQuotesStore } from '@/stores/quotes'
import { useErrorHandling } from '@/hooks/useErrorHandling'
import { useLocalization } from '@/stores/localization'
import { storeToRefs } from 'pinia'

const localizationStore = useLocalization()

const { mediumFontClass } = storeToRefs(localizationStore)

const emit = defineEmits(['closeEditDialog'])

const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  movieId: {
    type: Number,
    required: true
  },
  authorName: {
    type: String,
    required: true
  },
  authorProfileImageSrc: {
    type: String,
    required: true
  },
  quote_en: {
    type: String,
    required: true
  },
  quote_ka: {
    type: String,
    required: true
  },
  quoteImageSrc: {
    type: String,
    required: true
  },
  show: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    required: true
  }
})

const quotesStore = useQuotesStore()

const initialValues = {
  quote_en: props.quote_en,
  quote_ka: props.quote_ka
}

const onDeleteQuote = async () => {
  await quotesStore.handleDeletingQuote(props.id)
}

const updateThumbnail = (e, handleChange) => {
  const file = e.target.files[0]
  handleChange(file)
}

const onSubmit = async (values, actions) => {
  const formData = new FormData()

  formData.append('movie_id', props.movieId)

  formData.append('quote_en', values.quote_en)

  formData.append('quote_ka', values.quote_ka)

  if (values.thumbnail) {
    formData.append('thumbnail', values.thumbnail)
  }

  try {
    await quotesStore.handleEditingQuote(props.id, formData)
    emit('closeEditDialog')
  } catch (e) {
    const errors = e.response.data.errors
    useErrorHandling(errors, actions)
  }
}

const QuoteCard = defineAsyncComponent(() => import('../quotes/QuoteCard.vue'))
const DashboardDialog = defineAsyncComponent(() => import('../ui/BaseDashboardDialog.vue'))
const DashboardTextarea = defineAsyncComponent(() => import('../form/DashboardTextArea.vue'))
const UserProfileCard = defineAsyncComponent(() => import('../user/UserProfileCard.vue'))
</script>

<template>
  <DashboardDialog :show="show" @close="emit('closeEditDialog')" :show-profile-card="false">
    <template #header>
      <div class="absolute left-8 top-1/2 -translate-y-1/2 flex gap-6">
        <img
          src="@/assets/icons/trash-can.svg"
          :alt="$t('alts.trashcan_icon')"
          @click="onDeleteQuote"
          class="cursor-pointer"
        />
      </div>
      <h2
        :class="mediumFontClass"
        class="text-xl md:text-2xl pt-5 pb-6 border-b-2 border-light-midnight"
      >
        {{ title }}
      </h2>
      <img
        src="@/assets/icons/crossing-icon.svg"
        alt="Dialog closing icon"
        class="absolute top-1/2 -translate-y-1/2 right-10 hover:cursor-pointer"
        @click="emit('closeEditDialog')"
    /></template>
    <QuoteCard
      v-if="id"
      :id="id"
      :quote="quote"
      :author-name="authorName"
      :author-profile-image-src="authorProfileImageSrc"
      :quote-image-src="quoteImageSrc"
      :show-likes="false"
      :show-comments="false"
      class="!px-0 !md:px-0 !text-start !py-0"
    >
      <template #header>
        <UserProfileCard :user-profile-image-src="quoteAuthorProfileImageSrc" class="mb-4">
          {{ authorName }}
        </UserProfileCard>
        <Form class="flex flex-col gap-4" :initial-values="initialValues" @submit="onSubmit">
          <DashboardTextarea :inverse="true" name="quote_en" lang="Eng" />
          <DashboardTextarea :inverse="true" name="quote_ka" lang="ქარ" />
          <Field v-slot="{ handleChange, handleBlur }" name="thumbnail">
            <input
              type="file"
              id="thumbnail"
              class="hidden"
              @blur="handleBlur"
              @change="updateThumbnail($event, handleChange)"
            />
          </Field>
          <div class="relative">
            <img :src="quoteImageSrc" :alt="$t('alts.quote_image')" class="rounded-lg" />
            <label
              for="thumbnail"
              class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 rounded-[.63rem] bg-choose-file-gradient px-6 py-3 cursor-pointer"
            >
              <img src="@/assets/icons/input/camera.svg" alt="Camera icon" class="mx-auto mt-2" />
              <span class="mt-2.5"> Change Photo </span>
            </label>
          </div>
          <ActionButton submit type="primary" class="w-full mt-6">{{
            $t('quote.save_changes')
          }}</ActionButton>
        </Form>
      </template>
    </QuoteCard>
  </DashboardDialog>
</template>
