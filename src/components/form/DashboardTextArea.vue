<script setup>
import { Field, ErrorMessage } from 'vee-validate'

defineProps({
  name: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    required: true
  },
  lang: {
    type: String,
    required: true
  },
  rules: {
    type: String,
    required: false,
    default: 'required'
  }
})
</script>

<template>
  <div class="relative">
    <Field v-slot="{ field }" :rules="rules" :name="name" :id="name">
      <textarea
        v-bind="field"
        :placeholder="placeholder"
        class="bg-transparent border border-gray-slate text-base md:text-2xl italic py-2 ps-3 pe-20 text-gray-slate placeholder:text-gray-slate rounded-md w-full"
      ></textarea>
    </Field>
    <span class="absolute top-3 right-5 text-base md:text-xl">
      {{ lang }}
    </span>
    <ErrorMessage :name="name" class="text-red mt-1" />
  </div>
</template>
