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
</script>

<template>
  <div
    class="flex justify-between border border-gray-slate border-opacity-50 rounded px-6 py-5 text-xl hover:cursor-pointer"
  >
    <div class="flex gap-6">
      <img
        :src="notificationAuthorProfileImageSrc"
        alt="Notification author profile image"
        class="w-16 h-16"
      />
      <div class="flex flex-col gap-1 text-input-disabled-border">
        <span>{{ props.notificationAuthorName }}</span>
        <div v-if="commented" class="flex gap-3">
          <img src="@/assets/icons/notification/comment.svg" alt="Comment icon" />
          <span>Commented to your movie quote</span>
        </div>
        <div v-else-if="liked" class="flex gap-3">
          <img src="@/assets/icons/notification/heart.svg" alt="Like icon" />
          <span>Reacted to your quote</span>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-1">
      <span class="text-light-gray"> {{ time }} ago </span>
      <span v-if="!read" class="text-input-success text-end">New</span>
    </div>
  </div>
</template>
