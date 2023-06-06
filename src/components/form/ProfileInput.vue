<script setup>
import { computed, ref } from 'vue'
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
  value: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
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
    <label :for="name">{{ label }}</label>
    <div class="relative">
      <input
        v-bind="field"
        :id="name"
        :name="name"
        :type="inputType"
        :placeholder="placeholder"
        :value="value"
        class="ps-3 py-2 rounded text-input-text bg-gray-smoke w-full focus:outline-none focus:ring focus:border-none focus:ring-cloud-focus disabled:border disabled:border-input-disabled-border disabled:bg-input-disabled-placeholder disabled:text-input-disabled-placeholder"
      />
      <div
        v-if="isPassword"
        class="absolute top-1/2 -translate-y-1/2"
        :class="{ 'right-10': meta.touched, 'right-4': !meta.touched }"
      >
        <img
          src="@/assets/icons/input/eyelash.svg"
          alt="Eyelash icon"
          class="hover:cursor-pointer"
          @click="toggleType"
        />
      </div>
    </div>
  </div>
</template>
