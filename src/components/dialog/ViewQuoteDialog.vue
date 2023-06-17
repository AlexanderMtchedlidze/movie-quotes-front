<script setup>
import { defineAsyncComponent } from 'vue'
import { useThumbnailImagePath } from '@/hooks/useFullImagePath'
import { useQuotesStore } from '@/stores/quotes'
import { useLocalization } from '@/stores/localization'

const emit = defineEmits(['closeEditDialog', 'deleteQuote'])

const props = defineProps({
  quote: {
    type: Object,
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
const localizationStore = useLocalization()

const onDeleteQuote = async () => {
  await quotesStore.handleDeletingQuote(props.quote.id)
}

const QuoteCard = defineAsyncComponent(() => import('../quotes/QuoteCard.vue'))
const DashboardDialog = defineAsyncComponent(() => import('../ui/BaseDashboardDialog.vue'))
const DashboardTextInput = defineAsyncComponent(() => import('../form/DashboardTextInput.vue'))
const UserProfileCard = defineAsyncComponent(() => import('../user/UserProfileCard.vue'))
</script>

<template>
  <DashboardDialog :show="show" @close="emit('closeEditDialog')" :show-profile-card="false">
    <template #header>
      <div class="absolute left-8 top-1/2 -translate-y-1/2 flex gap-6">
        <img src="@/assets/icons/borderless-pencil.svg" :alt="$t('alts.pencil_icon')" />
        <img src="@/assets/icons/line.svg" alt="Line icon" class="h-5" />
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
        @click="tryClose"
    /></template>
    <QuoteCard
      v-if="quote"
      :id="quote.id"
      :author-name="quote.author.name"
      :author-profile-image-src="quote.author.profile_image"
      :quote="quote.quote[localizationStore.locale]"
      :quote-image-src="useThumbnailImagePath(quote.thumbnail)"
      :movie="quote.movie.movie[localizationStore.locale]"
      :movie-year="quote.movie.year"
      :comments-count="quote.comments_count"
      :comments="quote.comments"
      :likes-count="quote.likes_count"
      class="!px-0 !md:px-0 !text-start !py-0"
    >
      <template #header>
        <UserProfileCard :user-profile-image-src="quoteAuthorProfileImageSrc" class="mb-4">
          {{ quote.author.name }}
        </UserProfileCard>
        <div class="flex flex-col gap-2 mb-6">
          <DashboardTextInput disabled :value="quote.quote.en" name="quote_en" lang="Eng" />
          <DashboardTextInput disabled :value="quote.quote.ka" name="quote_ka" lang="ქარ" />
        </div>
      </template>
    </QuoteCard>
  </DashboardDialog>
</template>
