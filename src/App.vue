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
  <RouterView />
</template>
