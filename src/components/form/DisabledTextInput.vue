<script setup>
import { fieldClass } from '../utils/constants'
import { useLocalization } from '@/stores/localization'
import { computed } from 'vue'

const emit = defineEmits(['edit', 'update:modelValue', 'update:errorMessage'])

defineProps({
  value: {
    type: String,
    required: false,
    default: ''
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

const localization = useLocalization()

const editClass = computed(() => ({
  'md:-right-12': localization.locale === 'en',
  'md:-right-20': localization.locale === 'ka'
}))
</script>

<template>
  <div class="flex flex-col justify-start gap-0 md:gap-2">
    <label :for="name" class="text-left mr-auto">{{ label }}</label>
    <div class="flex items-center relative">
      <input
        :value="value"
        :id="name"
        :name="name"
        :placeholder="placeholder"
        disabled
        :class="['text-lg md:text-xl', fieldClass]"
      />
      <div class="absolute text-input-disabled-border md:text-white" :class="editClass">
        <p class="hover:cursor-pointer" @click="emit('edit', name)">
          {{ $t('profile.form.actions.edit') }}
        </p>
      </div>
    </div>
  </div>
</template>
