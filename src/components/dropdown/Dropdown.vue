<script setup>
import { ref } from 'vue'

const show = ref(false)

const toggleVisibility = () => {
  show.value = !show.value
}
</script>

<template>
  <div class="relative">
    <div @click="toggleVisibility">
      <slot name="trigger"></slot>
    </div>
    <div v-show="show" @click="toggleVisibility">
      <slot></slot>
    </div>
  </div>
</template>
