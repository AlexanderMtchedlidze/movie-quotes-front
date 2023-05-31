<script setup>
import { computed } from 'vue'

const props = defineProps({
  to: {
    required: true,
    type: String
  },
  type: {
    type: String,
    required: false,
    default: 'primary'
  }
})

const isPrimary = computed(() => props.type === 'primary')

const isSecondary = computed(() => props.type === 'secondary')

const isTertiary = computed(() => props.type === 'tertiry')

const linkClass = computed(() => {
  return {
    underline: isPrimary.value,
    'text-link-blue': isPrimary.value,
    'text-gray-slate': isSecondary.value,
    'text-white': isTertiary.value
  }
})
</script>

<template>
  <RouterLink :to="to" :class="linkClass"><slot></slot></RouterLink>
</template>
