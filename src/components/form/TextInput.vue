<script setup>
import { Field, ErrorMessage } from 'vee-validate'
defineProps({
  label: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: false,
    default: 'text'
  },
  placeholder: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  rules: {
    type: String,
    required: false,
    default: 'required'
  },
  required: {
    type: Boolean,
    required: false,
    default: true
  }
})
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="flex justify-start gap-1">
      <label :for="name">{{ label }}</label>
      <img
        v-if="required"
        src="../../assets/icons/asterisk.svg"
        alt="Asterisk icon saying that current field is required"
      />
    </div>
    <Field
      :type="type"
      :id="name"
      :name="name"
      :placeholder="placeholder"
      :rules="rules"
      class="px-3 py-2 rounded text-gray-md bg-gray-sm"
    />
    <ErrorMessage :name="name" />
  </div>
</template>
