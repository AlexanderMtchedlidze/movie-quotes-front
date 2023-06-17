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

const wrapperClass = computed(() => ({
  'flex items-center border border-gray-slate rounded': props.label
}))

const textInputClass = computed(() => ({
  'border border-gray-slate ps-4': !props.label,
  'focus:outline-none': props.label,
  'pe-20': !props.type === 'number'
}))
</script>

<template>
  <div>
    <div class="relative mb-1" :class="wrapperClass">
      <span
        v-if="label"
        class="whitespace-nowrap mb-1 ml-4 mr-2 text-base md:text-xl text-gray-slate"
        >{{ label }}:</span
      >
      <Field v-slot="{ field }" :rules="rules" :name="name" :id="name">
        <input
          v-bind="field"
          :type="type"
          :placeholder="placeholder"
          class="w-full bg-transparent placeholder:text-white text-base md:text-2xl py-2 rounded-md"
          :class="textInputClass"
        />
      </Field>
      <span class="absolute top-1/2 -translate-y-1/2 right-5 text-gray-slate text-base md:text-xl">
        {{ lang }}
      </span>
    </div>
    <ErrorMessage class="text-red-error" :name="name" />
  </div>
</template>
