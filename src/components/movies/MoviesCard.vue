<script setup>
defineProps({
  id: {
    type: Number,
    required: true
  },
  movieImageSrc: {
    type: String,
    required: true
  },
  movie: {
    type: String,
    required: true
  },
  quotesCount: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <figure class="font-normal">
    <img :src="movieImageSrc" alt="Movie image" class="rounded-xl" />
    <div class="flex flex-col gap-5 mt-4">
      <span class="text-2xl">
        {{ movie }}
      </span>
      <div class="flex gap-3">
        <img src="@/assets/icons/notification/comment.svg" alt="Quote icon" />
        {{ quotesCount }}
      </div>
    </div>
  </figure>
</template>
