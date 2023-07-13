<script setup>
import { ref, computed } from 'vue'
import { useQuotesStore } from '@/stores/quotes'
import { useRouter } from 'vue-router'

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
  },
  isUserInQuoteLikes: {
    type: Boolean,
    required: true
  }
})

const heartIconSrc = computed(() => {
  if (props.isUserInQuoteLikes) {
    return '/red-heart.svg'
  }
  return '/heart.svg'
})

const quotesStore = useQuotesStore()

const quoteOptionsPanelVisibility = ref(false)

const toggleQuoteOptionsPanelVisibility = () => {
  quoteOptionsPanelVisibility.value = !quoteOptionsPanelVisibility.value
}

const router = useRouter()

const toggleQuoteEditPanelVisibility = async () => {
  quotesStore.quote = null
  router.push({ name: 'editQuoteDialog', params: { quoteId: props.id } })
}

const toggleQuoteViewDialogVisibility = async () => {
  quotesStore.quote = null
  router.push({ name: 'viewQuoteDialog', params: { quoteId: props.id } })
}

const onDeleteQuote = async () => {
  await quotesStore.handleDeletingQuote(props.id)
}
</script>

<template>
  <div class="flex flex-col md:flex-row md:items-center gap-6 relative">
    <div
      v-show="quoteOptionsPanelVisibility"
      class="absolute flex flex-col gap-8 -bottom-16 md:-bottom-0 md:top-6 right-0 md:-right-44 bg-midnight-creme-brulee rounded-lg py-8 ps-10 pe-20 h-52"
    >
      <div class="flex gap-4 hover:cursor-pointer" @click="toggleQuoteViewDialogVisibility">
        <img src="@/assets/icons/eye.svg" :alt="$t('alts.eyelash_icon')" />
        <span class="cursor-pointer"> {{ $t('quote.show') }} </span>
      </div>
      <div class="flex gap-4 cursor-pointer" @click="toggleQuoteEditPanelVisibility">
        <img src="@/assets/icons/borderless-pencil.svg" :alt="$t('alts.pencil_icon')" />
        <span class="cursor-pointer"> {{ $t('quote.edit') }} </span>
      </div>
      <div class="flex gap-4 cursor-pointer" @click="onDeleteQuote">
        <img src="@/assets/icons/trash-can.svg" :alt="$t('alts.trashcan_icon')" />
        <span class="cursor-pointer" @click="onDeleteQuote"> {{ $t('quote.delete') }} </span>
      </div>
    </div>
    <img
      :src="thumbnail"
      alt="Quote thumbnail"
      class="rounded-sm w-5/12 h-5/12 sm:w-5/12 md:w-5/12 lg:w-5/12 hidden md:block"
    />
    <div
      :style="{ backgroundImage: `url(${thumbnail})` }"
      class="block md:hidden h-36 rounded-sm bg-cover bg-center"
    ></div>

    <blockquote class="italic text-2xl text-start text-input-disabled-border">
      "{{ quoteText }}"
    </blockquote>
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
      <img src="/comment-white.svg" :alt="$t('alts.comment_icon')" class="cursor-pointer" />
    </div>
    <div class="flex gap-3">
      <span>{{ likesCount }}</span>
      <img :src="heartIconSrc" :alt="$t('alts.like_icon')" class="cursor-pointer" />
    </div>
    <img
      src="@/assets/icons/three-dots.svg"
      :alt="$t('alts.three_dots_icon')"
      class="block md:hidden ml-auto hover:cursor-pointer"
      @click="toggleQuoteOptionsPanelVisibility"
    />
  </div>
</template>
