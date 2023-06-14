<script setup>
import { ErrorMessage, Field } from 'vee-validate'
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
  type: {
    type: String,
    required: false,
    default: 'text'
  },
  lang: {
    type: String,
    required: false,
    defualt: ''
  },
  rules: {
    type: String,
    required: false,
    default: 'required'
  },
  label: {
    type: String,
    required: false
  }
})

const textInputClass = computed(() => ({
  'ps-3': !props.label,
  'ps-[8.5rem]': props.label
}))
</script>

<template>
  <div>
    <span v-if="label" class="absolute start-4 top-1/2 -translate-y-1/2 text-xl text-gray-slate"
      >{{ label }}:</span
    >
    <div class="relative">
      <Field v-slot="{ field }" :rules="rules" :name="name" :id="name">
        <input
          v-bind="field"
          :type="type"
          :placeholder="placeholder"
          class="mb-1 bg-transparent border border-gray-slate placeholder:text-white text-base md:text-2xl py-2 pe-20 rounded-md w-full"
          :class="textInputClass"
        />
      </Field>
      <span class="absolute top-1/2 -translate-y-1/2 right-5 text-gray-slate text-base md:text-xl">
        {{ lang }}
      </span>
    </div>
    <ErrorMessage class="text-red" :name="name" />
  </div>
</template>
