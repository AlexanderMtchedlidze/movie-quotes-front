<script setup>
import { computed, ref } from 'vue'
import { Field, ErrorMessage } from 'vee-validate'
const props = defineProps({
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

const isPassword = computed(() => props.type === 'password')

const inputType = ref(props.type)

const toggleType = () => {
  inputType.value === 'password' ? (inputType.value = 'text') : (inputType.value = 'password')
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="flex gap-1">
      <label :for="name">{{ label }}</label>
      <img
        v-if="required"
        src="@/assets/icons/asterisk.svg"
        alt="Asterisk icon stating that current field is required"
      />
    </div>
    <div class="relative">
      <Field v-slot="{ field, meta }" :id="name" :name="name" :rules="rules">
        <input
          v-bind="field"
          :type="inputType"
          :placeholder="placeholder"
          class="ps-3 py-2 rounded text-input-text bg-gray-smoke w-full focus:outline-none focus:ring focus:border-none focus:ring-cloud-focus disabled:border disabled:border-input-disabled-border disabled:bg-input-disabled-placeholder disabled:text-input-disabled-placeholder"
          :class="{
            'border-2 border-red': !meta.valid && meta.touched,
            'border-2 border-input-success': meta.valid && meta.touched,
            'pe-10': !meta.touched,
            'pe-16': meta.touched
          }"
        />
        <div v-if="meta.touched" class="absolute right-4 top-1/2 -translate-y-1/2">
          <img
            v-if="meta.valid"
            src="@/assets/icons/valid.svg"
            alt="Valid icon stating that input value is correct"
          />
          <img
            v-else
            src="@/assets/icons/invalid.svg"
            alt="Invalid icon stating that input value is incorrect"
          />
        </div>
        <div
          v-if="isPassword"
          class="absolute top-1/2 -translate-y-1/2"
          :class="{ 'right-10': meta.touched, 'right-4': !meta.touched }"
        >
          <img
            src="@/assets/icons/eyelash.svg"
            alt="Eyelash icon"
            class="hover:cursor-pointer"
            @click="toggleType"
          />
        </div>
      </Field>
    </div>
    <ErrorMessage :name="name" class="text-left text-red-error" />
  </div>
</template>
