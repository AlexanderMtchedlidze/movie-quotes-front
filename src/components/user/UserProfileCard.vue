<script setup>
import { useLocalization } from '@/stores/localization'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'

const localizationStore = useLocalization()

const authStore = useAuthStore()

const { mediumFontClass } = storeToRefs(localizationStore)

defineProps({
  userProfileImageSrc: {
    type: String,
    required: true
  },
  shouldDisplayName: {
    type: Boolean,
    required: false,
    default: true
  }
})
</script>

<template>
  <div class="flex items-center gap-4 text-base md:text-xl" :class="mediumFontClass">
    <div class="h-14 w-14">
      <img
        :src="userProfileImageSrc"
        :alt="$t('alts.user_profile_image')"
        class="w-14 h-14 rounded-full"
      />
    </div>
    <slot v-if="shouldDisplayName">
      <p>{{ authStore.user.name }}</p>
    </slot>
  </div>
</template>
