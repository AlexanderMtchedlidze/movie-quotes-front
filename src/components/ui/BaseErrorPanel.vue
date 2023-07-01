<script setup>
defineProps({
  title: {
    type: String,
    required: false
  }
})
</script>

<template>
  <div class="rounded border border-input-disabled-border/20 p-6">
    <slot name="title">{{ title }}</slot>
    <div class="mt-4 flex flex-col gap-1 justify-center text-sm tracking-wider">
      <slot></slot>
    </div>
  </div>
</template>
