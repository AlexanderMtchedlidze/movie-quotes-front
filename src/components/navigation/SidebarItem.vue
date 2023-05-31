<script setup>
defineProps({
  to: {
    type: [String, Object],
    required: true
  },
  linkType: {
    type: String,
    required: false,
    default: 'tertiary'
  },
  linkText: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="flex items-center gap-10">
    <slot></slot>
    <slot name="link">
      <BaseLink :to="to" :type="linkType" class="text-xl 2xl:text-2xl">{{ linkText }}</BaseLink>
    </slot>
  </div>
</template>
