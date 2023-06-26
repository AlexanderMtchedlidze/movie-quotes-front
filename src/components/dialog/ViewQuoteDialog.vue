<script setup>
import { defineAsyncComponent } from 'vue'
import { useQuotesStore } from '@/stores/quotes'
import { mediumFontClass } from '@/components/utils/constants'

const emit = defineEmits(['closeViewDialog'])

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
  commentsCount: {
    type: Number,
    required: true
  },
  comments: {
    type: Array,
    required: true
  },
  likesCount: {
    type: Number,
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

const onEditQuote = () => {
  emit('closeViewDialog')
  emit('openEditDialog')
}

const onDeleteQuote = async () => {
  emit('closeViewDialog')
  await quotesStore.handleDeletingQuote(props.id)
}

const QuoteCard = defineAsyncComponent(() => import('../quotes/QuoteCard.vue'))
const DashboardDialog = defineAsyncComponent(() => import('../ui/BaseDashboardDialog.vue'))
const DashboardTextInput = defineAsyncComponent(() => import('../form/DashboardTextInput.vue'))
const UserProfileCard = defineAsyncComponent(() => import('../user/UserProfileCard.vue'))
</script>

<template>
  <DashboardDialog :show="show" @close="emit('closeViewDialog')" :show-profile-card="false">
    <template #header>
      <div class="absolute left-8 top-1/2 -translate-y-1/2 flex gap-6">
        <img
          src="@/assets/icons/borderless-pencil.svg"
          :alt="$t('alts.pencil_icon')"
          @click="onEditQuote"
        />
        <img src="@/assets/icons/line.svg" alt="Line icon" class="h-5" />
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
        @click="emit('closeViewDialog')"
    /></template>
    <QuoteCard
      v-if="id"
      :id="id"
      :author-name="authorName"
      :author-profile-image-src="authorProfileImageSrc"
      :quote-image-src="quoteImageSrc"
      :comments-count="commentsCount"
      :comments="comments"
      :likes-count="likesCount"
      class="!px-0 !md:px-0 !text-start !py-0"
    >
      <template #header>
        <UserProfileCard :user-profile-image-src="quoteAuthorProfileImageSrc" class="mb-4">
          {{ authorName }}
        </UserProfileCard>
        <div class="flex flex-col gap-3 mb-6">
          <DashboardTextInput disabled :value="quote_en" name="quote_en" lang="Eng" />
          <DashboardTextInput disabled :value="quote_ka" name="quote_ka" lang="ქარ" />
        </div>
      </template>
    </QuoteCard>
  </DashboardDialog>
</template>
