<script setup>
import { computed } from 'vue'
const props = defineProps({
  type: {
    type: String,
    required: false,
    default: 'col'
  }
})

const sectionClass = computed(() => {
  return [
    'w-3/5',
    'mx-auto',
    'flex',
    'justify-center',
    {
      'flex-col': props.type === 'col'
    }
  ]
})
</script>

<template>
  <section :class="sectionClass">
    <slot></slot>
  </section>
</template>
