<script setup>
import { mediumFontClass } from '@/components/utils/constants'

defineProps({
  authorName: {
    type: String,
    required: true
  },
  authorProfileImageSrc: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="flex items-center gap-6">
    <img
      :src="authorProfileImageSrc"
      :alt="$t('alts.comment_author_profile_image')"
      class="rounded-full mb-auto h-12 w-12"
    />
    <div class="mt-0 md:mt-3 text-base md:text-xl w-full">
      <p :class="mediumFontClass">{{ authorName }}</p>
      <p class="mt-2">{{ comment }}</p>
      <div class="mt-6 border border-midnight-creme-brulee"></div>
    </div>
  </div>
</template>
