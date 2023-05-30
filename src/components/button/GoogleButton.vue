<script setup>
import { computed } from 'vue'

const url = computed(
  () => import.meta.env.VITE_BASE_URL + import.meta.env.VITE_GOOGLE_AUTH_REDIRECT_PATH
)
</script>

<template>
  <ActionButton
    link
    target="_blank"
    :href="url"
    class="flex items-center justify-center gap-2"
  >
    <img src="@/assets/icons/google-icon.svg" alt="Google icon" />
    <span><slot></slot></span>
  </ActionButton>
</template>
