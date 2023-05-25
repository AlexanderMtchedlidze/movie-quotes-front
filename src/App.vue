<script setup>
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
import { RouterView } from 'vue-router'
import { configure } from 'vee-validate'

if (localStorage.getItem('locale')) {
  locale.value = localStorage.getItem('locale')
}

configure({
  validateOnInput: true
})
</script>

<template>
  <div class="h-screen bg-midnight-blue">
    <RouterView />
  </div>
</template>
