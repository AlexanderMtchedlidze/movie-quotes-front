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
  },
  inverse: {
    type: Boolean,
    required: false,
    default: false
  },
  label: {
    type: String,
    required: false
  }
})

const wrapperClass = computed(() => ({
  'flex flex-col md:flex-row border border-gray-slate rounded': props.label
}))

const textareaClass = computed(() => ({
  'italic text-gray-slate placeholder:text-gray-slate': props.italic,
  'text-white placeholder:text-white': !props.italic || props.inverse,
  'border border-gray-slate ps-3': !props.label,
  'focus:outline-none ps-4 md:ps-0 py-0 md:py-2': props.label,
  'py-2': !props.label
}))

const langTextClass = computed(() => ({
  'text-gray-slate': !props.italic || props.inverse
}))
</script>

<template>
  <div>
    <div class="relative mb-1" :class="wrapperClass">
      <span v-if="label" class="mb-1 mt-2 ml-4 mr-2 text-base md:text-xl text-gray-slate"
        >{{ label }}:</span
      >
      <Field v-slot="{ field }" :rules="rules" :name="name" :id="name">
        <textarea
          v-bind="field"
          :placeholder="placeholder"
          class="bg-transparent text-base md:text-2xl pe-20 rounded-md w-full"
          :class="textareaClass"
        ></textarea>
      </Field>
      <span class="absolute top-3 right-5 text-base md:text-xl" :class="langTextClass">
        {{ lang }}
      </span>
    </div>
    <ErrorMessage :name="name" class="text-red-error mt-1" />
  </div>
</template>
