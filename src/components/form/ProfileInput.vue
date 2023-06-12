<script setup>
import { computed, ref } from 'vue'
import { Field } from 'vee-validate'
import { fieldClass } from '../utils/constants'

const emit = defineEmits(['edit', 'update:modelValue', 'update:errorMessage'])

const props = defineProps({
  modelValue: {
    type: String,
    required: false
  },
  rules: {
    type: String,
    required: false
  },
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
    required: false,
    default: ''
  }
})

const isPassword = computed(() => props.type === 'password')

const inputType = ref(props.type)

const toggleType = () => {
  inputType.value === 'password' ? (inputType.value = 'text') : (inputType.value = 'password')
}

const clearValue = () => {
  emit('update:modelValue', '')
}

const value = computed({
  get: () => props.modelValue,
  set: (newVal) => {
    emit('update:modelValue', newVal)
  }
})
</script>

<template>
  <div class="flex flex-col justify-start gap-0 md:gap-2">
    <label :for="name" class="text-left mr-auto">{{ label }}</label>
    <div class="flex items-center relative">
      <Field
        v-slot="{ field, meta, errorMessage }"
        v-model="value"
        :id="name"
        :name="name"
        :rules="rules"
      >
        {{ emit('update:errorMessage', errorMessage) }}
        <div class="flex-1 relative">
          <input
            v-bind="field"
            :type="inputType"
            :placeholder="placeholder"
            :class="[
              'text-lg md:text-xl',
              fieldClass,
              {
                'border-2 border-red': !meta.valid && meta.touched,
                'border-2 border-input-success': meta.valid && meta.touched,
                'pe-10': !meta.touched,
                'pe-16': meta.touched && !isPassword,
                'pe-24': meta.touched && isPassword
              }
            ]"
          />
          <div v-if="meta.touched" class="absolute right-4 top-1/2 -translate-y-1/2">
            <img
              v-if="meta.valid"
              src="@/assets/icons/input/valid.svg"
              alt="Valid icon stating that input value is correct"
            />
            <img
              v-else
              src="@/assets/icons/input/invalid.svg"
              alt="Invalid icon stating that input value is incorrect"
            />
          </div>
          <div
            v-if="isPassword"
            :class="{ 'right-16': meta.touched, 'right-10': !meta.touched }"
            class="absolute top-1/2 -translate-y-1/2"
          >
            <img
              src="@/assets/icons/input/eyelash.svg"
              alt="Eyelash icon"
              class="hover:cursor-pointer w-7 h-7"
              @click="toggleType"
            />
          </div>
          <div
            :class="{ 'right-10': meta.touched, 'right-4': !meta.touched }"
            class="absolute top-1/2 -translate-y-1/2"
          >
            <img
              src="@/assets/icons/input/cross.svg"
              alt="Cross icon"
              class="hover:cursor-pointer"
              @click="clearValue"
            />
          </div>
        </div>
        <span class="absolute -bottom-8 text-left text-red-error whitespace-nowrap">
          {{ errorMessage }}
        </span>
      </Field>
    </div>
  </div>
</template>