<script setup>
defineProps({
  to: {
    required: true,
    type: String
  }
})
</script>

<template>
  <RouterLink :to="to" class="underline text-link-blue"><slot></slot></RouterLink>
</template>
