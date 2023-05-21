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
  },
  submit: {
    type: Boolean,
    required: false,
    default: false
  }
})

const isOutline = computed(() => props.type === 'outline')

const isPrimary = computed(() => props.type === 'primary')

const type = computed(() => props.submit ? 'submit' : 'button')

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
  <button :class="buttonClass" :type="type">
    <slot></slot>
  </button>
</template>
