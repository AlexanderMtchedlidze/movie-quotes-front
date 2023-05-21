<script setup>
import { defineAsyncComponent } from 'vue'
import { useLocalization } from '@/stores/i18n/localization.js'
import { storeToRefs } from 'pinia'

const Dropdown = defineAsyncComponent(() => import('./Dropdown.vue'))
const DropdownItem = defineAsyncComponent(() => import('./DropdownItem.vue'))

const localization = useLocalization()

const { currentLocale } = storeToRefs(localization)

const setLocalization = (value) => {
  localization.setLocale(value)
}
</script>

<template>
  <Dropdown>
    <template #dropdown-trigger>
      <button class="flex items-center gap-3">
        <span class="text-white capitalize">{{ currentLocale }}</span>
        <img src="@/assets/icons/dropdown-vector.svg" alt="Dropdown arrow vector" />
      </button>
    </template>
    <template #default>
      <DropdownItem value="ka" @set-locale="setLocalization" />
      <DropdownItem value="en" @set-locale="setLocalization" />
    </template>
  </Dropdown>
</template>
