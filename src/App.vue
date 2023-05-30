<script setup>
import { RouterView } from 'vue-router'
import { configure } from 'vee-validate'
import customValMessages from './config/vee-validate/messages'

configure({
  ...customValMessages,
  validateOnInput: true
})
</script>

<template>
  <div class="h-screen bg-midnight-blue">
    <RouterView />
  </div>
</template>
