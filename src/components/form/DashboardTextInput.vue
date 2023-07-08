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
  },
  value: {
    type: String,
    required: false
  }
})

const textInputRules = computed(() => {
  const restrictLanguageInput =
    props.lang === 'Eng' ? 'restrictEnglishInput' : 'restrictGeorgianInput'
  return props.rules + '|' + restrictLanguageInput
})

const wrapperClass = computed(() => ({
  'flex items-center border border-gray-slate rounded': props.label
}))

const textInputClass = computed(() => ({
  'border border-gray-slate ps-4': !props.label,
  'focus:outline-none': props.label
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
      <Field v-slot="{ field }" :rules="textInputRules" :name="name" :id="name">
        <input
          v-if="value"
          v-bind="field"
          :value="value"
          :type="type"
          :placeholder="placeholder"
          class="w-full bg-transparent placeholder:text-white text-base md:text-2xl py-2 rounded-md pe-14"
          :class="textInputClass"
          min="1"
        />
        <input
          v-else
          v-bind="field"
          :type="type"
          :placeholder="placeholder"
          class="w-full bg-transparent placeholder:text-white text-base md:text-2xl py-2 rounded-md pe-14"
          :class="textInputClass"
          min="1"
        />
      </Field>
      <span class="absolute top-1/2 -translate-y-1/2 right-5 text-gray-slate text-base md:text-xl">
        {{ lang }}
      </span>
    </div>
    <ErrorMessage class="text-red-error" :name="name" />
  </div>
</template>

<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
