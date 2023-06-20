<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    required: true,
    type: String
  },
  helperText: {
    required: true,
    type: String
  },
  mt: {
    required: false,
    type: String,
    default: '2'
  }
})

const titleClass = computed(() => 'mt-' + props.mt)
</script>

<template>
  <div class="bg-dashboard-gradient h-screen flex flex-col items-center justify-center text-white">
    <div class="flex flex-col items-center gap-7 relative">
      <slot></slot>
      <h1 :class="titleClass" class="text-3xl md:text-5xl font-bold">{{ title }}</h1>
    </div>
    <div class="mt-2">
      <p class="text-base md:text-2xl font-medium text-center">
        {{ helperText }}
      </p>
    </div>
    <ActionButton link href="/" type="primary" class="mt-8 md:mt-12">{{
      $t('not_found.return_home')
    }}</ActionButton>
  </div>
</template>
