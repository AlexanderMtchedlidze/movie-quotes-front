<script setup>
import { computed } from 'vue'

const url = computed(
  () =>
    import.meta.env.VITE_BASE_URL +
    import.meta.env.VITE_API_PATH +
    import.meta.env.VITE_GOOGLE_AUTH_REDIRECT_PATH
)
</script>

<template>
  <ActionButton link :href="url" class="flex items-center justify-center gap-2">
    <img src="@/assets/icons/google-icon.svg" :alt="$t('alts.google_icon')" />
    <span><slot></slot></span>
  </ActionButton>
</template>
