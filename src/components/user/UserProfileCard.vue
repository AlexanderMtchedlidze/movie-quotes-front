<script setup>
import { user } from '@/stores/auth/helpers'
import { useUserProfileImagePath } from '@/hooks/useFullImagePath'

defineProps({
  userProfileImageSrc: {
    type: String,
    required: false,
    default: useUserProfileImagePath(user.value.profile_image).value
  },
  shouldDisplayName: {
    type: Boolean,
    required: false,
    default: true
  }
})
</script>

<template>
  <img :src="userProfileImageSrc" alt="User profile image" class="w-12 h-12" />
  <slot v-if="shouldDisplayName">
    <p class="text-xl">{{ user.name }}</p>
  </slot>
</template>
