<script setup>
defineProps({
  label: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="flex gap-2 items-center">
    <input type="checkbox" :id="name" :name="name" class="w-4 h-4" />
    <label :for="name">{{ label }}</label>
  </div>
</template>
