<script setup>
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
import { RouterView } from 'vue-router'

if (localStorage.getItem('locale')) {
  locale.value = localStorage.getItem('locale')
}
</script>

<template>
  <div class="h-screen bg-midnight">
    <RouterView />
  </div>
</template>
