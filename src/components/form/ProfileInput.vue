<script setup>
import { computed, ref } from 'vue'
import { Field } from 'vee-validate'
import { fieldClass } from '../utils/constants'

const emit = defineEmits(['edit', 'update:modelValue'])

const props = defineProps({
  modelValue: {
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
    required: true
  },
  clearable: {
    type: Boolean,
    required: false,
    default: false
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
  <div class="flex flex-col gap-2">
    <label :for="name" class="text-left">{{ label }}</label>
    <div class="flex items-center relative">
      <Field v-slot="{ field }" :id="name" :name="name" v-model="value">
        <div class="flex-1 relative">
          <input
            v-bind="field"
            :type="inputType"
            :placeholder="placeholder"
            :class="fieldClass"
            :disabled="!clearable"
          />
          <div
            v-if="isPassword"
            class="absolute top-1/2 -translate-y-1/2 right-10"
          >
            <img
              src="@/assets/icons/input/eyelash.svg"
              alt="Eyelash icon"
              class="hover:cursor-pointer"
              @click="toggleType"
            />
          </div>
          <div v-if="clearable" class="absolute top-1/2 -translate-y-1/2 right-4">
            <img
              src="@/assets/icons/input/cross.svg"
              alt="Cross icon"
              class="hover:cursor-pointer"
              @click="clearValue"
            />
          </div>
        </div>
      </Field>
      <div class="absolute -right-12">
        <p v-if="!clearable" class="hover:cursor-pointer" @click="emit('edit', name)">Edit</p>
      </div>
    </div>
  </div>
</template>
