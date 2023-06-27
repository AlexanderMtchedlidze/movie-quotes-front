<script setup>
import { useLocalization } from '@/stores/localization'
import { storeToRefs } from 'pinia'

const localizationStore = useLocalization()

const { mediumFontClass } = storeToRefs(localizationStore)

defineProps({
  userProfileImageSrc: {
    type: String,
    required: false,
    default: userProfileImageSrc
  },
  shouldDisplayName: {
    type: Boolean,
    required: false,
    default: true
  }
})
</script>

<script>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useUserProfileImagePath } from '@/hooks/useFullImagePath'

const authStore = useAuthStore()

const userProfileImageSrc = computed(() => useUserProfileImagePath(authStore.user.profile_image))
</script>

<template>
  <div class="flex items-center gap-4 text-base md:text-xl" :class="mediumFontClass">
    <div class="h-12 w-12">
      <img
        :src="userProfileImageSrc"
        :alt="$t('alts.user_profile_image')"
        class="w-full rounded-full"
      />
    </div>
    <slot v-if="shouldDisplayName">
      <p>{{ authStore.user.name }}</p>
    </slot>
  </div>
</template>
