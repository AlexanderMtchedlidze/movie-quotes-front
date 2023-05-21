<script setup>
import { defineAsyncComponent, computed } from 'vue'
import { useLocalization } from '@/stores/i18n/localization.js'
import { useI18n } from 'vue-i18n'

const Dropdown = defineAsyncComponent(() => import('./Dropdown.vue'))
const DropdownItem = defineAsyncComponent(() => import('./DropdownItem.vue'))

const localization = useLocalization()

const currentLocale = computed(() => {
  const currentLang = localization.currentLocale
  return t(`lang_dropdown.${currentLang}`)
})

const setLocalization = (value) => {
  localization.setLocale(value)
}

const { t } = useI18n()
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
      <DropdownItem value="ka" :textContent="t('lang_dropdown.ka')" @set-locale="setLocalization" />
      <DropdownItem value="en" :textContent="t('lang_dropdown.en')" @set-locale="setLocalization" />
    </template>
  </Dropdown>
</template>
