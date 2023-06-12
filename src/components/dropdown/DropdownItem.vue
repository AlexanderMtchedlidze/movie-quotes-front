<script setup>
defineProps({
  value: {
    type: String,
    required: true
  },
  textContent: {
    type: String,
    required: true
  }
})
</script>

<template>
  <span class="block leading-5 text-sm md:text-base text-white cursor-pointer capitalize">
    {{ textContent }}
  </span>
</template>
