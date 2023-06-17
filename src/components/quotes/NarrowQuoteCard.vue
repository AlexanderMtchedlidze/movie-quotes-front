<script setup>
import { ref } from 'vue'
import { useQuotesStore } from '@/stores/quotes'

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
  quote: {
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

const quotesStore = useQuotesStore()

const quoteOptionsPanelVisibility = ref(false)

const toggleQuoteOptionsPanelVisibility = () => {
  quoteOptionsPanelVisibility.value = !quoteOptionsPanelVisibility.value
}

const onDeleteQuote = async () => {
  await quotesStore.handleDeletingQuote(props.id)
  emit('deleteQuote')
}
</script>

<template>
  <div class="flex flex-col md:flex-row items-center gap-6 relative">
    <div
      v-show="quoteOptionsPanelVisibility"
      class="absolute flex flex-col gap-8 -bottom-16 md:-bottom-0 md:top-6 right-0 md:-right-44 bg-midnight-creme-brulee rounded-lg py-8 ps-10 pe-20 h-52"
    >
      <div class="flex gap-4">
        <img src="@/assets/icons/eye.svg" :alt="$t('alts.eyelash_icon')" />
        <span class="hover:cursor-pointer"> {{ $t('quote.show') }} </span>
      </div>
      <div class="flex gap-4">
        <img src="@/assets/icons/borderless-pencil.svg" :alt="$t('alts.pencil_icon')" />
        <span class="hover:cursor-pointer"> {{ $t('quote.edit') }} </span>
      </div>
      <div class="flex gap-4">
        <img src="@/assets/icons/trash-can.svg" :alt="$t('alts.trashcan_icon')" />
        <span class="hover:cursor-pointer" @click="onDeleteQuote"> {{ $t('quote.delete') }} </span>
      </div>
    </div>
    <img :src="thumbnail" alt="Quote thumbnail" class="rounded-sm w-1/3" />
    <blockquote class="italic text-2xl text-input-disabled-border">"{{ quote }}"</blockquote>
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
