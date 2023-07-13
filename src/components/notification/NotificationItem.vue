<script setup>
import { computed } from 'vue'

const props = defineProps({
  read: {
    type: Boolean,
    required: true
  },
  notificationAuthorProfileImageSrc: {
    type: String,
    required: true
  },
  notificationAuthorName: {
    type: String,
    required: true
  },
  action: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  }
})

const commented = computed(() => props.action === 'commented')

const liked = computed(() => props.action === 'liked')

const isNotRead = computed(() => props.read === null || props.read === '0')

const imageWrapperClass = computed(() => ({
  'ring-2 ring-input-success': isNotRead.value
}))
</script>

<template>
  <div
    class="flex justify-between border border-gray-slate border-opacity-50 rounded px-6 py-5 text-xl hover:cursor-pointer"
  >
    <div class="flex gap-6">
      <div class="hidden md:block rounded-full w-16 h-16" :class="imageWrapperClass">
        <img
          :src="notificationAuthorProfileImageSrc"
          :alt="$t('alts.notification_author_profile_image')"
          class="rounded-full w-16 h-16"
        />
      </div>
      <div class="block md:hidden">
        <div class="flex flex-col gap-1">
          <div class="rounded-full w-16 h-16" :class="imageWrapperClass">
            <img
              :src="notificationAuthorProfileImageSrc"
              :alt="$t('alts.notification_author_profile_image')"
              class="rounded-full w-full h-full"
            />
          </div>
          <span v-if="isNotRead" class="text-input-success text-center">{{
            $t('notifications.new')
          }}</span>
        </div>
      </div>
      <div class="flex flex-col gap-1 text-input-disabled-border">
        <span>{{ notificationAuthorName }}</span>
        <div class="text-base md:text-xl">
          <div v-if="commented" class="flex gap-3">
            <img src="@/assets/icons/notification/comment.svg" :alt="$t('alts.comment_icon')" />
            <span>{{ $t('notifications.commented_to_your_movie_quote') }}</span>
          </div>
          <div v-else-if="liked" class="flex gap-3">
            <img src="@/assets/icons/notification/heart.svg" :alt="$t('alts.like_icon')" />
            <span>{{ $t('notifications.reacted_to_your_quote') }}</span>
          </div>
          <div class="block md:hidden mt-2">
            <span class="text-light-gray"> {{ time }} </span>
          </div>
        </div>
      </div>
    </div>
    <div class="hidden md:block">
      <div class="flex flex-col gap-1 text-base md:text-xl">
        <span class="text-light-gray"> {{ time }} </span>
        <span v-if="isNotRead" class="text-input-success text-end">{{
          $t('notifications.new')
        }}</span>
      </div>
    </div>
  </div>
</template>
