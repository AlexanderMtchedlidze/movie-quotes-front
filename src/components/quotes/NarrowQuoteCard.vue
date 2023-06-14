<script setup>
import { ref } from 'vue'

defineProps({
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

const quoteOptionsPanelVisibility = ref(false)

const toggleQuoteOptionsPanelVisibility = () => {
  quoteOptionsPanelVisibility.value = !quoteOptionsPanelVisibility.value
}
</script>

<template>
  <div class="flex items-center gap-6 relative">
    <div
      v-show="quoteOptionsPanelVisibility"
      class="absolute flex flex-col gap-8 top-6 -right-36 bg-midnight-creme-brulee rounded-lg py-8 ps-10 pe-20"
    >
      <div class="flex gap-4">
        <img src="@/assets/icons/eye.svg" alt="Eye icon" />
        <span class="hover:cursor-pointer"> Show </span>
      </div>
      <div class="flex gap-4">
        <img src="@/assets/icons/borderless-pencil.svg" alt="Pencil icon" />
        <span class="hover:cursor-pointer"> Edit </span>
      </div>
      <div class="flex gap-4">
        <img src="@/assets/icons/trash-can.svg" alt="Trash can icon" />
        <span class="hover:cursor-pointer"> Delete </span>
      </div>
    </div>
    <img :src="thumbnail" alt="Quote thumbnail" class="h-36 rounded-sm" />
    <blockquote class="italic text-2xl text-input-disabled-border">"{{ quote }}"</blockquote>
    <img
      src="@/assets/icons/three-dots.svg"
      alt="Three dots icon"
      class="absolute top-0 right-0 hover:cursor-pointer"
      @click="toggleQuoteOptionsPanelVisibility"
    />
  </div>
  <div class="border border-[#EFEFEF]/20"></div>
  <div class="flex gap-6">
    <div class="flex gap-3">
      <span>{{ commentsCount }}</span>
      <img src="/heart.svg" alt="Heart icon" />
    </div>
    <div class="flex gap-3">
      <span>{{ likesCount }}</span>
      <img src="/comment-white.svg" alt="Comment icon" />
    </div>
  </div>
</template>
