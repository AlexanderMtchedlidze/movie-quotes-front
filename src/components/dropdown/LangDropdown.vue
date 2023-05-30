<script setup>
import { defineAsyncComponent, computed, ref } from 'vue'
import { useLocalization } from '@/stores/i18n'
import { useI18n } from 'vue-i18n'

const DropdownItem = defineAsyncComponent(() => import('./DropdownItem.vue'))

const show = ref(false)

const toggleVisibility = () => {
  show.value = !show.value
}

const localizationStore = useLocalization()

const { t } = useI18n()

const currentLocale = computed(() => {
  const currentLang = localizationStore.currentLocale
  return t(`lang_dropdown.${currentLang}`)
})

const setLocalization = (value) => {
  localizationStore.setLocale(value)
}
</script>

<template>
  <div class="relative">
    <div @click="toggleVisibility">
      <button class="flex items-center gap-3">
        <span class="text-white capitalize">{{ currentLocale }}</span>
        <img src="@/assets/icons/dropdown-vector.svg" alt="Dropdown arrow vector" />
      </button>
    </div>
    <div
      v-show="show"
      class="absolute bg-light-midnight px-2 py-2 mt-2 rounded-xl w-full z-50"
      @click="toggleVisibility"
    >
      <DropdownItem value="ka" :textContent="t('lang_dropdown.ka')" @set-locale="setLocalization" />
      <DropdownItem value="en" :textContent="t('lang_dropdown.en')" @set-locale="setLocalization" />
    </div>
  </div>
</template>
