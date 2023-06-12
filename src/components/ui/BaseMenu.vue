<script setup>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

const emit = defineEmits(['close'])

const target = ref(null)

onClickOutside(target, () => emit('close'))
</script>

<template>
  <div class="absolute text-white z-50 overflow-y-auto" ref="target">
    <slot></slot>
  </div>
</template>
