<script setup>
defineProps({
  author: {
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
    <img :src="authorProfileImageSrc" alt="Comment author profile image" class="mb-auto h-12 w-12" />
    <div class="mt-3 text-xl w-full">
      <p class="font-medium">{{ author }}</p>
      <p class="mt-2">{{ comment }}</p>
      <div class="mt-6 border border-midnight-creme-brulee"></div>
    </div>
  </div>
</template>
