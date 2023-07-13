<script setup>
import { useQuotesStore } from '@/stores/quotes'
import { useUserProfileImagePath } from '@/hooks/useFullImagePath'
import { defineAsyncComponent, computed, ref } from 'vue'
import { useLocalization } from '@/stores/localization'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const localizationStore = useLocalization()

const mediumFontClass = storeToRefs(localizationStore)

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

const heartIconSrc = computed(() => {
  if (isUserInQuoteLikes.value) {
    return '/red-heart.svg'
  }
  return '/heart.svg'
})

const toggleLike = async () => {
  if (quotesStore.isUserInQuoteLikes(props.id)) {
    isUserInQuoteLikes.value = await quotesStore.handleUnlikingQuote(props.id)
  } else {
    isUserInQuoteLikes.value = await quotesStore.handleLikingQuote(props.id)
  }
}

const comment = ref(null)

const submitComment = async () => {
  await quotesStore.handleCommentingOnQuote(props.id, comment.value.value)
  comment.value.value = ''
}

const MAX_INITIAL_COMMENTS = 2

const commentsToShow = ref(MAX_INITIAL_COMMENTS)

const toggleComments = () => {
  if (commentsToShow.value === MAX_INITIAL_COMMENTS) {
    commentsToShow.value = Infinity
  } else {
    commentsToShow.value = MAX_INITIAL_COMMENTS
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
        <div :class="mediumFontClass" class="flex gap-2 mt-4 mb-7 text-base md:text-xl">
          <blockquote>"{{ quote }}"</blockquote>
          <p>
            {{ $t('news_feed.movie') }} &#45;
            <span class="text-creme-brulee">{{ movie }} ({{ movieYear }})</span>
          </p>
        </div>
      </header>
      <img :src="quoteImageSrc" alt="Quote Image" class="w-full h-full object-fill rounded-lg" />
    </slot>
    <div class="flex gap-6 my-6">
      <div class="flex gap-3" v-if="showComments">
        <span class="text-xl">
          {{ commentsCount }}
        </span>
        <img src="/comment-white.svg" :alt="$t('alts.comment_icon')" class="cursor-pointer" />
      </div>
      <div class="flex gap-3" v-if="showLikes">
        <span class="text-xl">
          {{ likesCount }}
        </span>
        <img
          :src="heartIconSrc"
          @click="toggleLike"
          :alt="$t('alts.like_icon')"
          class="cursor-pointer"
        />
      </div>
    </div>
    <div class="border border-midnight-creme-brulee" v-if="comments"></div>
    <div v-if="comments" class="flex flex-col gap-8 mt-6">
      <template v-for="(comment, index) in comments">
        <CommentCard
          v-if="index < commentsToShow"
          :key="comment.id"
          :authorName="comment.author.name"
          :author-profile-image-src="useUserProfileImagePath(comment.author.profile_image)"
          :comment="comment.comment"
          @click="toggleComments"
        />
      </template>
    </div>
    <footer v-if="comments" class="flex gap-6 mt-6">
      <UserProfileCard
        :user-profile-image-src="useUserProfileImagePath(authStore.user.profile_image)"
        :should-display-name="false"
      />
      <input
        type="text"
        name="comment"
        :placeholder="$t('news_feed.form.write_a_comment')"
        class="w-full rounded-xl py-2 px-7 bg-midnight-creme-brulee text-input-disabled-border placeholder:text-input-disabled-border focus:outline-none"
        ref="comment"
        @keydown.enter="submitComment"
      />
    </footer>
  </figure>
</template>
