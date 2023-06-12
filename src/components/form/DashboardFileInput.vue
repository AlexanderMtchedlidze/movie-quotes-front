<script setup>
import { Field } from 'vee-validate'

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
  <div
    class="flex items-center gap-2 bg-transparent border border-gray-slate text-xl py-2 ps-3 pe-20 rounded-md w-full"
  >
    <img src="@/assets/icons/input/camera.svg" alt="Camera icon" />
    <p class="flex-2">Drag & drop your image here or</p>
    <Field :name="name">
      <input @change="updateModel" :name="name" :id="name" type="file" class="flex-1" />
    </Field>
  </div>
</template>
