<script setup>
import { defineAsyncComponent } from 'vue'
import { user } from '@/stores/auth/helpers'
import { useUserProfileImagePath } from '@/hooks/useFullImagePath'
import { useQuotesStore } from '@/stores/quotes'

const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  authorName: {
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
  commentsCount: {
    type: Number,
    required: true
  },
  comments: {
    type: Array,
    required: true
  },
  likesCount: {
    type: Number,
    required: true
  }
})

const quotesStore = useQuotesStore()

const CommentCard = defineAsyncComponent(() => import('./CommentCard.vue'))

const userProfileImageSrc = useUserProfileImagePath(user.value.profile_image)

const quoteAuthorProfileImageSrc = useUserProfileImagePath(props.authorProfileImageSrc)

const likeQuote = async () => {
  await quotesStore.handleLikingQuote(props.id)
}
</script>

<template>
  <figure class="px-6 py-6 bg-midnight-blue rounded-xl">
    <header class="mb-4">
      <div class="flex gap-4 items-center">
        <img
          :src="quoteAuthorProfileImageSrc"
          alt="Quote publisher profile image"
          class="w-14 h-14"
        />
        <p class="text-xl">
          {{ authorName }}
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
        {{ commentsCount }}
        <img src="@/assets/icons/quotes/comment.svg" alt="Comment icon" />
      </div>
      <div class="flex gap-3">
        {{ likesCount }}
        <img src="@/assets/icons/quotes/heart.svg" alt="Heart icon" @click="likeQuote" />
      </div>
    </div>
    <div class="border border-midnight-creme-brulee"></div>
    <div class="flex flex-col gap-8 mt-6">
      <CommentCard
        v-for="comment in comments"
        :key="comment.id"
        :authorName="comment.author.name"
        :author-profile-image-src="comment.author.profile_image"
        :comment="comment.comment"
      />
    </div>
    <footer class="flex gap-6 mt-6">
      <img :src="userProfileImageSrc" alt="Authenticated user profile image" class="w-12 h-12" />
      <input
        type="text"
        name="comment"
        placeholder="Write a comment"
        class="w-full rounded-xl py-2 px-7 bg-midnight-creme-brulee text-input-disabled-border placeholder:text-input-disabled-border"
      />
    </footer>
  </figure>
</template>
