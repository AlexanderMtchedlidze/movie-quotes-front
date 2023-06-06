<script setup>
defineProps({
  userProfileImageSrc: {
    type: String,
    required: false,
    default: defaultUserProfileImage
  },
  shouldDisplayName: {
    type: Boolean,
    required: false,
    default: true
  }
})
</script>

<script>
import { useAuthStore } from '@/stores/auth'
import { useUserProfileImagePath } from '@/hooks/useFullImagePath'

const authStore = useAuthStore()

const defaultUserProfileImage = useUserProfileImagePath(authStore.user.profile_image)
</script>

<template>
  <div class="flex items-center gap-4 text-base md:text-xl">
    <div class="h-12 w-12">
      <img :src="userProfileImageSrc" alt="User profile image" class="w-full" />
    </div>
    <slot v-if="shouldDisplayName">
      <p>{{ authStore.user.name }}</p>
    </slot>
  </div>
</template>
