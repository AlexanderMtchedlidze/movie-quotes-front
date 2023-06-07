<script setup>
const emit = defineEmits(['update:modelValue'])

defineProps({
  name: {
    type: String,
    required: true
  }
})

const updateModel = (e) => {
  const file = e.target.files[0]
  emit('update:modelValue', file)
}
</script>

<template>
  <slot name="trigger"></slot>
  <input @change="updateModel" :name="name" :id="name" type="file" class="hidden" />
</template>
