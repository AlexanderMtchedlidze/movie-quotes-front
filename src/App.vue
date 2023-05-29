<script setup>
import { RouterView } from 'vue-router'
import { configure } from 'vee-validate'

configure({
  validateOnInput: true
})
</script>

<template>
  <div class="h-screen bg-midnight-blue">
    <RouterView />
  </div>
</template>
