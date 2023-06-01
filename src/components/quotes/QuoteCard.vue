<script setup>
import { defineAsyncComponent } from 'vue'

defineProps({
  id: {
    type: Number,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  authorProfileImageSrc: {
    type: String,
    required: true
  },
  quote: {
    type: String,
    required: true
  },
  quoteImageSrc: {
    type: String,
    required: true
  },
  movie: {
    type: String,
    required: true
  },
  commentAmount: {
    type: Number,
    required: true
  },
  comments: {
    type: Array,
    required: true
  },
  likeAmount: {
    type: Number,
    required: true
  }
})

const CommentCard = defineAsyncComponent(() => import('./CommentCard.vue'))
</script>

<template>
  <figure class="px-6 py-6 bg-midnight-blue rounded-xl">
    <header class="mb-4">
      <div class="flex gap-4 items-center">
        <img :src="authorProfileImageSrc" alt="Quote publisher profile image" />
        <p class="text-xl">
          {{ author }}
        </p>
      </div>
      <div class="flex gap-2 mt-4 mb-7 font-medium text-xl">
        <blockquote>"{{ quote }}"</blockquote>
        <p>
          Movie &#45; <span class="text-creme-brulee">{{ movie }}</span>
        </p>
      </div>
    </header>
    <div>
      <img :src="quoteImageSrc" alt="Quote image" />
    </div>
    <div class="flex gap-6 my-6">
      <div class="flex gap-3">
        {{ commentAmount }}
        <img src="@/assets/icons/quotes/comment.svg" alt="Comment icon" />
      </div>
      <div class="flex gap-3">
        {{ likeAmount }}
        <img src="@/assets/icons/quotes/heart.svg" alt="Heart icon" />
      </div>
    </div>
    <div class="border border-midnight-creme-brulee"></div>
    <div class="flex flex-col gap-8 mt-6">
      <CommentCard
        v-for="comment in comments"
        :key="comment.id"
        :author="comment.author"
        :author-profile-image-src="comment.authorProfileImageSrc"
        :comment="comment.comment"
      />
    </div>
    <footer class="flex gap-6 mt-6">
      <img src="/default-profile-image.png" alt="Authenticated user profile image" class="w-12 h-12" />
      <input
        type="text"
        name="comment"
        placeholder="Write a comment"
        class="w-full rounded-xl py-2 px-7 bg-midnight-creme-brulee text-input-disabled-border placeholder:text-input-disabled-border"
      />
    </footer>
  </figure>
</template>
