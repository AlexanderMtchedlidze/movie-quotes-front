<script setup>
import { defineAsyncComponent, reactive, computed, ref } from 'vue'
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
    required: false
  },
  movieYear: {
    type: Number,
    required: false
  },
  commentsCount: {
    type: Number,
    required: false
  },
  comments: {
    type: Array,
    required: false
  },
  likesCount: {
    type: Number,
    required: false
  },
  showLikes: {
    type: Boolean,
    required: false,
    default: true
  },
  showComments: {
    type: Boolean,
    required: false,
    default: true
  }
})

const quoteAuthorProfileImageSrc = computed(() =>
  useUserProfileImagePath(props.authorProfileImageSrc)
)

const quotesStore = useQuotesStore()

const isUserInQuoteLikes = ref(quotesStore.isUserInQuoteLikes(props.id))

const isLikeHovered = ref(false)

const toggleLikeHover = () => {
  isLikeHovered.value = !isLikeHovered.value
}

const heartIconSrc = computed(() => {
  if (isUserInQuoteLikes.value && !isLikeHovered.value) {
    return '/red-heart.svg'
  }
  if (!isUserInQuoteLikes.value && isLikeHovered.value) {
    return '/red-heart.svg'
  }
  if (isUserInQuoteLikes.value && isLikeHovered.value) {
    return '/heart.svg'
  }
  return '/heart.svg'
})

const toggleLike = async () => {
  isUserInQuoteLikes.value = await quotesStore.handleLikingQuote(props.id)
}

const isCommentHovered = ref(false)

const toggleCommentHover = () => {
  isCommentHovered.value = !isCommentHovered.value
}

const commentIconSrc = computed(() => {
  if (isCommentHovered.value) {
    return '/comment.svg'
  }
  return '/comment-white.svg'
})

const form = reactive({
  comment: null
})

const submitComment = async () => {
  if (form.comment !== '') {
    await quotesStore.handleCommentingOnQuote(props.id, form)
    form.comment = ''
  }
}
const CommentCard = defineAsyncComponent(() => import('./CommentCard.vue'))
const UserProfileCard = defineAsyncComponent(() => import('../user/UserProfileCard.vue'))
</script>

<template>
  <figure class="px-8 md:px-6 py-7 md:py-6 bg-midnight-blue rounded-xl">
    <slot name="header">
      <header class="mb-4">
        <div class="flex gap-4 items-center">
          <UserProfileCard :user-profile-image-src="quoteAuthorProfileImageSrc">
            {{ authorName }}
          </UserProfileCard>
        </div>
        <div class="flex gap-2 mt-4 mb-7 font-medium text-base md:text-xl">
          <blockquote>"{{ quote }}"</blockquote>
          <p>
            Movie &#45; <span class="text-creme-brulee">{{ movie }} ({{ movieYear }})</span>
          </p>
        </div>
      </header>
      <div>
        <img :src="quoteImageSrc" :alt="$t('alts.quote_image')" class="rounded-lg" />
      </div>
    </slot>
    <div class="flex gap-6 my-6">
      <div class="flex gap-3" v-if="showComments">
        <span class="text-xl">
          {{ commentsCount }}
        </span>
        <img
          :src="commentIconSrc"
          @mouseover="toggleCommentHover"
          @mouseleave="toggleCommentHover"
          :alt="$t('alts.comment_icon')"
        />
      </div>
      <div class="flex gap-3" v-if="showLikes">
        <span class="text-xl">
          {{ likesCount }}
        </span>
        <img
          :src="heartIconSrc"
          @mouseover="toggleLikeHover"
          @mouseleave="toggleLikeHover"
          @click="toggleLike"
          :alt="$t('alts.like_icon')"
        />
      </div>
    </div>
    <div class="border border-midnight-creme-brulee" v-if="comments"></div>
    <div v-if="comments" class="flex flex-col gap-8 mt-6">
      <CommentCard
        v-for="comment in comments"
        :key="comment.id"
        :authorName="comment.author.name"
        :author-profile-image-src="useUserProfileImagePath(comment.author.profile_image)"
        :comment="comment.comment"
      />
    </div>
    <footer v-if="comments" class="flex gap-6 mt-6">
      <UserProfileCard :should-display-name="false" />
      <input
        type="text"
        name="comment"
        placeholder="Write a comment"
        class="w-full rounded-xl py-2 px-7 bg-midnight-creme-brulee text-input-disabled-border placeholder:text-input-disabled-border focus:outline-none"
        v-model.trim="form.comment"
        @keydown.enter="submitComment"
      />
    </footer>
  </figure>
</template>
