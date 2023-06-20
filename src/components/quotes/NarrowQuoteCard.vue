<script setup>
import { defineAsyncComponent, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useQuotesStore } from '@/stores/quotes'
import { useThumbnailImagePath } from '@/hooks/useFullImagePath'

const emit = defineEmits(['deleteQuote'])

const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  quoteText: {
    type: String,
    required: true
  },
  commentsCount: {
    type: Number,
    required: true
  },
  likesCount: {
    type: Number,
    required: true
  }
})

onMounted(async () => {})

const quotesStore = useQuotesStore()

const { quote } = storeToRefs(quotesStore)

const quoteOptionsPanelVisibility = ref(false)

const toggleQuoteOptionsPanelVisibility = () => {
  quoteOptionsPanelVisibility.value = !quoteOptionsPanelVisibility.value
}

const quoteEditPanelVisibility = ref(false)

const toggleQuoteEditPanelVisibility = async () => {
  quotesStore.quote = null
  await quotesStore.handleGettingQuote(props.id)
  quoteEditPanelVisibility.value = !quoteEditPanelVisibility.value
}

const quoteViewDialogVisibility = ref(false)

const toggleQuoteViewDialogVisibility = async () => {
  quotesStore.quote = null
  await quotesStore.handleGettingQuote(props.id)
  quoteViewDialogVisibility.value = !quoteViewDialogVisibility.value
}

const onDeleteQuote = async () => {
  await quotesStore.handleDeletingQuote(props.id)
  emit('deleteQuote')
}

const ViewQuoteDialog = defineAsyncComponent(() => import('../dialog/ViewQuoteDialog.vue'))
const EditQuoteDialog = defineAsyncComponent(() => import('../dialog/EditQuoteDialog.vue'))
</script>

<template>
  <ViewQuoteDialog
    v-if="quote"
    :id="quote.id"
    :author-name="quote.author.name"
    :author-profile-image-src="quote.author.profile_image"
    :quote_en="quote.quote.en"
    :quote_ka="quote.quote.ka"
    :quote-image-src="useThumbnailImagePath(quote.thumbnail)"
    :comments-count="quote.comments_count"
    :comments="quote.comments"
    :likes-count="quote.likes_count"
    :show="quoteViewDialogVisibility"
    @close-view-dialog="toggleQuoteViewDialogVisibility"
    @open-edit-dialog="toggleQuoteEditPanelVisibility"
    :title="$t('quote.view_quote')"
  />

  <EditQuoteDialog
    v-if="quote"
    :id="quote.id"
    :movie-id="quote.movie.id"
    :author-name="quote.author.name"
    :author-profile-image-src="quote.author.profile_image"
    :quote_en="quote.quote.en"
    :quote_ka="quote.quote.ka"
    :quote-image-src="useThumbnailImagePath(quote.thumbnail)"
    :show="quoteEditPanelVisibility"
    @close-edit-dialog="toggleQuoteEditPanelVisibility"
    :title="$t('quote.edit_quote')"
  />

  <div class="flex flex-col md:flex-row items-center gap-6 relative">
    <div
      v-show="quoteOptionsPanelVisibility"
      class="absolute flex flex-col gap-8 -bottom-16 md:-bottom-0 md:top-6 right-0 md:-right-44 bg-midnight-creme-brulee rounded-lg py-8 ps-10 pe-20 h-52"
    >
      <div class="flex gap-4 hover:cursor-pointer" @click="toggleQuoteViewDialogVisibility">
        <img src="@/assets/icons/eye.svg" :alt="$t('alts.eyelash_icon')" />
        <span class="cursor-pointer"> {{ $t('quote.show') }} </span>
      </div>
      <div class="flex gap-4" @click="toggleQuoteEditPanelVisibility">
        <img src="@/assets/icons/borderless-pencil.svg" :alt="$t('alts.pencil_icon')" />
        <span class="cursor-pointer"> {{ $t('quote.edit') }} </span>
      </div>
      <div class="flex gap-4">
        <img src="@/assets/icons/trash-can.svg" :alt="$t('alts.trashcan_icon')" />
        <span class="cursor-pointer" @click="onDeleteQuote"> {{ $t('quote.delete') }} </span>
      </div>
    </div>
    <img :src="thumbnail" alt="Quote thumbnail" class="rounded-sm w-1/3" />
    <blockquote class="italic text-2xl text-input-disabled-border">"{{ quoteText }}"</blockquote>
    <img
      src="@/assets/icons/three-dots.svg"
      :alt="$t('alts.three_dots_icon')"
      class="hidden md:block absolute top-0 right-0 hover:cursor-pointer"
      @click="toggleQuoteOptionsPanelVisibility"
    />
  </div>
  <div class="border border-[#EFEFEF]/20"></div>
  <div class="flex gap-6">
    <div class="flex gap-3">
      <span>{{ commentsCount }}</span>
      <img src="/heart.svg" :alt="$t('alts.like_icon')" />
    </div>
    <div class="flex gap-3">
      <span>{{ likesCount }}</span>
      <img src="/comment-white.svg" :alt="$t('alts.comment_icon')" />
    </div>
    <img
      src="@/assets/icons/three-dots.svg"
      :alt="$t('alts.three_dots_icon')"
      class="block md:hidden ml-auto hover:cursor-pointer"
      @click="toggleQuoteOptionsPanelVisibility"
    />
  </div>
</template>
