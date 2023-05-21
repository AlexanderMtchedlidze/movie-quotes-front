<!-- eslint-disable vue/multi-word-component-names -->
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
      <slot name="dropdown-trigger"></slot>
    </div>
    <div v-show="show" class="absolute bg-light-midnight px-2 py-2 mt-2 rounded-xl w-full z-50">
      <slot></slot>
    </div>
  </div>
</template>
