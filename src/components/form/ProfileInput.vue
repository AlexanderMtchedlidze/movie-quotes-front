<script setup>
import { computed, ref, watch } from 'vue'
import { Field, ErrorMessage } from 'vee-validate'
import { fieldClass } from '../utils/constants'

const emit = defineEmits(['edit', 'update:modelValue', 'update:errorMessage', 'update:meta'])

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

const focused = ref(false)

const toggleFocus = () => {
  focused.value = !focused.value
}

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
        {{ emit('update:meta', meta) }}
        <div class="flex-1 relative">
          <input
            v-bind="field"
            @focus="toggleFocus"
            @blur="toggleFocus"
            :type="inputType"
            :placeholder="placeholder"
            :class="[
              'text-lg md:text-xl',
              fieldClass,
              {
                'border-2 border-red': (!meta.valid || errorMessage) && meta.dirty,
                'border-2 border-input-success': meta.valid && meta.dirty && !errorMessage,
                'pe-10': !meta.dirty,
                'pe-16': meta.dirty && !isPassword,
                'pe-24': meta.dirty && isPassword,
                'pe-[4.5rem]': !meta.dirty && isPassword
              }
            ]"
          />
          <div v-if="meta.dirty" class="absolute right-4 top-1/2 -translate-y-1/2">
            <img
              v-if="meta.valid && !errorMessage"
              src="@/assets/icons/input/valid.svg"
              :alt="$t('alts.valid_icon')"
            />
            <img v-else src="@/assets/icons/input/invalid.svg" :alt="$t('alts.invalid_icon')" />
          </div>
          <div
            v-if="isPassword && meta.dirty"
            :class="{ 'right-16': meta.dirty, 'right-10': !meta.dirty }"
            class="absolute top-1/2 -translate-y-1/2"
          >
            <img
              src="@/assets/icons/input/eyelash.svg"
              :alt="$t('alts.eyelash_icon')"
              class="hover:cursor-pointer w-7 h-7"
              @click="toggleType"
            />
          </div>
          <div
            :class="{ 'right-10': meta.dirty, 'right-4': !meta.dirty }"
            class="absolute top-1/2 -translate-y-1/2"
          >
            <img
              v-if="meta.dirty"
              src="@/assets/icons/input/cross.svg"
              :alt="$t('alts.cross_icon')"
              class="hover:cursor-pointer"
              @click="clearValue"
            />
          </div>
        </div>
      </Field>
    </div>
    <ErrorMessage :name="name" class="-bottom-8 text-left text-red-error" />
  </div>
</template>
