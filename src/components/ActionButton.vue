<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    required: false,
    default: 'outline'
  },
  padding: {
    type: String,
    required: false,
    default: 'normal'
  }
})

const isOutline = computed(() => props.type === 'outline')

const isPrimary = computed(() => props.type === 'primary')

const buttonClass = computed(() => [
  'py-2',
  'text-white',
  'rounded',
  {
    'px-4': props.padding === 'sm',
    'px-6': props.padding === 'normal',
    'bg-transparent shadow-outline-white': isOutline.value,
    'bg-button-primary hover:bg-button-primary-hover \
      active:bg-button-primary-active disabled:bg-button-primary-disabled': isPrimary.value
  }
])
</script>

<template>
  <button :class="buttonClass">
    <slot></slot>
  </button>
</template>
