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
  },
  link: {
    type: Boolean,
    required: false,
    default: false
  }
})

const isOutline = computed(() => props.type === 'outline')

const isPrimary = computed(() => props.type === 'primary')

const type = computed(() => (props.submit ? 'submit' : 'button'))

console.log(props.link)

const buttonClass = computed(() => [
  'py-2',
  'text-white',
  'rounded',
  {
    'px-4': props.padding === 'sm',
    'px-6': props.padding === 'normal',
    'bg-transparent shadow-outline-white': isOutline.value,
    'bg-red hover:bg-red-hover \
      active:bg-red-active disabled:bg-red-disabled': isPrimary.value
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
