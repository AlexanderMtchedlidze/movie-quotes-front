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

const linkClass = computed(() => {
  return {
    underline: isPrimary.value,
    'text-link-blue': isPrimary.value,
    'text-gray-slate': !isPrimary.value
  }
})
</script>

<template>
  <RouterLink :to="to" :class="linkClass"><slot></slot></RouterLink>
</template>
