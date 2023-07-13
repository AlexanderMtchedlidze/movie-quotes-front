<script setup>
import { defineAsyncComponent, onMounted } from 'vue'
import { useQuotesStore } from '@/stores/quotes'
import { useLocalization } from '@/stores/localization'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useUserProfileImagePath, useThumbnailImagePath } from '@/hooks/useFullImagePath'

const localizationStore = useLocalization()

const { mediumFontClass } = storeToRefs(localizationStore)

const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  quoteId: {
    type: Number,
    required: true
  }
})

const quotesStore = useQuotesStore()

const { quote } = storeToRefs(quotesStore)

onMounted(async () => {
  await quotesStore.handleGettingQuote(props.quoteId)
})

const router = useRouter()
const handleClosingViewDialog = () => {
  router.push({ name: 'movie' })
}

const handleOpeningEditDialog = () => {
  router.push({ name: 'editQuoteDialog' })
}

const onDeleteQuote = async () => {
  await quotesStore.handleDeletingQuote(props.quoteId)
  handleClosingViewDialog()
}

const QuoteCard = defineAsyncComponent(() => import('../quotes/QuoteCard.vue'))
const DashboardDialog = defineAsyncComponent(() => import('../ui/BaseDashboardDialog.vue'))
const DashboardTextInput = defineAsyncComponent(() => import('../form/DashboardTextInput.vue'))
const UserProfileCard = defineAsyncComponent(() => import('../user/UserProfileCard.vue'))
</script>

<template>
  <DashboardDialog :show="show" @close="handleClosingViewDialog" :show-profile-card="false">
    <template #header>
      <div class="absolute left-8 top-1/2 -translate-y-1/2 flex gap-6">
        <img
          src="@/assets/icons/borderless-pencil.svg"
          :alt="$t('alts.pencil_icon')"
          @click="handleOpeningEditDialog"
          class="cursor-pointer"
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
        {{ $t('quote.view_quote') }}
      </h2>
      <img
        src="@/assets/icons/crossing-icon.svg"
        alt="Dialog closing icon"
        class="absolute top-1/2 -translate-y-1/2 right-10 hover:cursor-pointer"
        @click="handleClosingViewDialog"
    /></template>
    <QuoteCard
      v-if="quote"
      :id="quoteId"
      :author-name="quote.author.name"
      :author-profile-image-src="useUserProfileImagePath(quote.author.profile_image)"
      :quote-image-src="useThumbnailImagePath(quote.thumbnail)"
      :comments-count="quote.comments_count"
      :comments="quote.comments"
      :likes-count="quote.likes_count"
      class="!px-0 !md:px-0 !text-start !py-0"
    >
      <template #header>
        <UserProfileCard
          :user-profile-image-src="useUserProfileImagePath(quote.author.profile_image)"
          class="mb-4"
        >
          {{ quote.author.name }}
        </UserProfileCard>
        <div class="flex flex-col gap-3 mb-6">
          <DashboardTextInput disabled :value="quote.quote.en" name="quote_en" lang="Eng" />
          <DashboardTextInput disabled :value="quote.quote.ka" name="quote_ka" lang="ქარ" />
        </div>
        <img :src="useThumbnailImagePath(quote.thumbnail)" alt="Quote Image" />
      </template>
    </QuoteCard>
  </DashboardDialog>
</template>
