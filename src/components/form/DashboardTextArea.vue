<script setup>
import { Field, ErrorMessage } from 'vee-validate'
import { computed } from 'vue'

const props = defineProps({
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
  },
  italic: {
    type: Boolean,
    required: false,
    default: true
  }
})

const textareaClass = computed(() => ({
  'italic text-gray-slate placeholder:text-gray-slate': props.italic,
  'placeholder:text-white': !props.italic
}))

const langTextClass = computed(() => ({
  'text-gray-slate': !props.italic
}))
</script>

<template>
  <div class="relative">
    <Field v-slot="{ field }" :rules="rules" :name="name" :id="name">
      <textarea
        v-bind="field"
        :placeholder="placeholder"
        class="bg-transparent border border-gray-slate text-base md:text-2xl py-2 ps-3 pe-20 rounded-md w-full"
        :class="textareaClass"
      ></textarea>
    </Field>
    <span class="absolute top-3 right-5 text-base md:text-xl" :class="langTextClass">
      {{ lang }}
    </span>
    <ErrorMessage :name="name" class="text-red-error mt-1" />
  </div>
</template>
