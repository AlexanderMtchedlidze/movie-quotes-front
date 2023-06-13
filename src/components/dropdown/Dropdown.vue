<script setup>
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'

defineProps({
  closeOnSelect: {
    type: Boolean,
    required: false,
    default: true
  }
})

const target = ref(null)

const show = ref(false)

const toggleVisibility = (closeOnSelect) => {
  if (closeOnSelect) {
    show.value = !show.value
  }
}

onClickOutside(target, () => (show.value = false))
</script>

<template>
  <div class="relative" ref="target">
    <div @click="toggleVisibility">
      <slot name="trigger"></slot>
    </div>
    <div v-show="show" @click="toggleVisibility(closeOnSelect)" class="mb-4">
      <slot></slot>
    </div>
  </div>
</template>
