<script setup>
import { fieldClass } from '../utils/constants'
import { useLocalization } from '@/stores/localization'
import { useAuthStore } from '@/stores/auth'
import { computed } from 'vue'

const emit = defineEmits(['edit', 'update:modelValue', 'update:errorMessage'])

const props = defineProps({
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

const localizationStore = useLocalization()

const authStore = useAuthStore()

const canEditField = computed(() => {
  const isAuthenticatedWithGoogle = authStore.user.google_token

  const isPrefilledUsernameField = props.name === 'prefilledUsername'

  return isAuthenticatedWithGoogle ? isPrefilledUsernameField : true
})

const editClass = computed(() => ({
  'md:-right-12': localizationStore.locale === 'en',
  'md:-right-20': localizationStore.locale === 'ka'
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
        :type="type"
        :class="['text-lg md:text-xl', fieldClass]"
        disabled
      />
      <div
        v-if="canEditField"
        class="absolute right-0 text-input-disabled-border md:text-white"
        :class="editClass"
      >
        <p class="hover:cursor-pointer" @click="emit('edit', name)">
          {{ $t('profile.form.actions.edit') }}
        </p>
      </div>
    </div>
  </div>
</template>
