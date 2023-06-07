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

const imageWrapperClass = computed(() => ({
  'ring-2': !props.read,
  'ring-input-success': !props.read
}))
</script>

<template>
  <div
    class="flex justify-between border border-gray-slate border-opacity-50 rounded px-6 py-5 text-xl hover:cursor-pointer"
  >
    <div class="flex gap-6">
      <div class="hidden md:block rounded-full" :class="imageWrapperClass">
        <img
          :src="notificationAuthorProfileImageSrc"
          alt="Notification author profile image"
          class="w-14 h-14 md:w-16 md:h-16"
        />
      </div>
      <div class="block md:hidden">
        <div class="flex flex-col gap-1">
          <div class="rounded-full" :class="imageWrapperClass">
            <img
              :src="notificationAuthorProfileImageSrc"
              alt="Notification author profile image"
              class="w-14 h-14 md:w-16 md:h-16"
            />
          </div>
          <span v-if="!read" class="text-input-success text-center">New</span>
        </div>
      </div>
      <div class="flex flex-col gap-1 text-input-disabled-border">
        <span>{{ props.notificationAuthorName }}</span>
        <div class="text-base md:text-xl">
          <div v-if="commented" class="flex gap-3">
            <img src="@/assets/icons/notification/comment.svg" alt="Comment icon" />
            <span>Commented to your movie quote</span>
          </div>
          <div v-else-if="liked" class="flex gap-3">
            <img src="@/assets/icons/notification/heart.svg" alt="Like icon" />
            <span>Reacted to your quote</span>
          </div>
          <div class="block md:hidden mt-2">
            <span class="text-light-gray"> {{ time }} ago </span>
          </div>
        </div>
      </div>
    </div>
    <div class="hidden md:block">
      <div class="flex flex-col gap-1 text-base md:text-xl">
        <span class="text-light-gray"> {{ time }} ago </span>
        <span v-if="!read" class="text-input-success text-end">New</span>
      </div>
    </div>
  </div>
</template>
