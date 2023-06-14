<script setup>
import { ref, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { configure } from 'vee-validate'
import { useAuthStore } from './stores/auth'
import instantiatePusher from '@/helpers/instantiatePusher.js'
import customValMessages from './config/vee-validate/messages'

const pursherActive = ref(false)

configure({
  ...customValMessages,
  validateOnInput: true
})

const authStore = useAuthStore()

onMounted(async () => {
  await authStore.fetchUser()
  pursherActive.value = instantiatePusher()
  window.Echo.private(`notifications.${authStore.user.id}`).listen('NotificationSent', (data) => {
    console.log(data)
  })
})
</script>

<template>
  <RouterView />
</template>
