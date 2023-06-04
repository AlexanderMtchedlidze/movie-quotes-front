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
  },
})
</script>

<template>
  <div class="flex items-center gap-4 text-xl">
    <div class="h-12 w-12">
        <img :src="userProfileImageSrc" alt="User profile image" class="w-full" />
    </div>
    <slot v-if="shouldDisplayName">
      <p>{{ user.name }}</p>
    </slot> 
  </div>
</template>
