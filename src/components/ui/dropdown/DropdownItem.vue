<script setup>
const emit = defineEmits(['updateLocalization'])
const props = defineProps({
  value: {
    type: String,
    required: true
  },
  textContent: {
    type: String,
    required: true
  }
})

const updateLocale = (value) => {
  emit('setLocale', value)
}
</script>

<template>
  <span
    class="block leading-5 text-white cursor-pointer capitalize"
    @click="updateLocale(props.value)"
  >
    {{ textContent }}
  </span>
</template>
