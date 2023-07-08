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
        src="@/assets/icons/input/asterisk.svg"
        alt="Asterisk icon stating that current field is required"
        class="w-3 h-3"
      />
    </div>
    <div class="relative">
      <Field v-slot="{ field, meta, errorMessage }" :id="name" :name="name" :rules="rules">
        <input
          v-bind="field"
          :type="inputType"
          :placeholder="placeholder"
          class="pe-10 ps-3 py-2 rounded text-input-text bg-gray-smoke w-full focus:outline-none focus:ring focus:border-none focus:ring-cloud-focus disabled:border disabled:border-input-disabled-border disabled:bg-input-disabled-placeholder disabled:text-input-disabled-placeholder"
          :class="{
            'border-2 border-red': (!meta.valid || errorMessage) && meta.touched,
            'border-2 border-input-success': meta.valid && meta.touched && !errorMessage,
            'pe-16': meta.touched && isPassword,
            'pe-10': meta.touched && !isPassword
          }"
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
          class="absolute top-1/2 -translate-y-1/2"
          :class="{ 'right-10': meta.dirty, 'right-4': !meta.dirty }"
        >
          <img
            src="@/assets/icons/input/eyelash.svg"
            :alt="$t('alts.eyelash_icon')"
            class="hover:cursor-pointer"
            @click="toggleType"
          />
        </div>
      </Field>
    </div>
    <ErrorMessage :name="name" class="text-left text-red-error" />
  </div>
</template>
