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
    default: 'md'
  },
  submit: {
    type: Boolean,
    required: false,
    default: false
  },
  link: {
    type: Boolean,
    required: false,
    default: false
  }
})

const isPrimary = computed(() => props.type === 'primary')

const isOutline = computed(() => props.type === 'outline')

const isTertiary = computed(() => props.type === 'tertiary')

const type = computed(() => (props.submit ? 'submit' : 'button'))

const buttonClass = computed(() => [
  'py-2',
  'text-white',
  'rounded',
  'px-3',
  'py-1.5',
  {
    'md:px-4': props.padding === 'sm',
    'md:px-6': props.padding === 'md',
    'bg-transparent shadow-outline-white': isOutline.value,
    'bg-red hover:bg-red-hover \
      active:bg-red-active disabled:bg-red-disabled': isPrimary.value,
    'bg-midnight-creme-brulee': isTertiary.value
  }
])
</script>

<template>
  <a v-if="link" :class="buttonClass">
    <slot></slot>
  </a>
  <button v-else :class="buttonClass" :type="type">
    <slot></slot>
  </button>
</template>
