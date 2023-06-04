<script setup>
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'

const target = ref(null)

const show = ref(false)

const toggleVisibility = () => {
  show.value = !show.value
}

onClickOutside(target, () => (show.value = false))
</script>

<template>
  <div class="relative" ref="target">
    <div @click="toggleVisibility">
      <slot name="trigger"></slot>
    </div>
    <div v-show="show" @click="toggleVisibility">
      <slot></slot>
    </div>
  </div>
</template>
