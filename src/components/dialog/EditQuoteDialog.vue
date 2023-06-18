<script setup>
import { Form } from 'vee-validate'
import { defineAsyncComponent } from 'vue'
import { useThumbnailImagePath } from '@/hooks/useFullImagePath'
import { useQuotesStore } from '@/stores/quotes'
import { useLocalization } from '@/stores/localization'

const emit = defineEmits(['closeEditDialog'])

const props = defineProps({
  id: {
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

const initialValues = {}

const onDeleteQuote = async () => {
  await quotesStore.handleDeletingQuote(props.quote.id)
}

const onEditQuote = async () => {
  await quotesStore.handleEditingQuote(props.quote.id)
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
      <h2 class="text-xl md:text-2xl pt-5 pb-6 font-medium border-b-2 border-light-midnight">
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
        <div class="flex flex-col gap-3 mb-6">
          <Form>
            <DashboardTextarea name="quote_en" lang="Eng" />
            <DashboardTextarea name="quote_ka" lang="ქარ" />
          </Form>
        </div>
      </template>
    </QuoteCard>
  </DashboardDialog>
</template>
