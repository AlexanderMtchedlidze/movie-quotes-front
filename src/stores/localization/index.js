import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n'
import { setLocale as setVeeValidateLocale } from '@vee-validate/i18n'

export const useLocalization = defineStore('localizationStore', () => {
  const { locale } = useI18n()
  const isCurrentLocaleKa = ref(locale.value === 'ka')

  watch(locale, (newLocale) => {
    localStorage.setItem('locale', newLocale)
    isCurrentLocaleKa.value = newLocale === 'ka' ? true : false
  })

  function setLocale(value) {
    locale.value = value
    setVeeValidateLocale(value)
  }

  const boldFontClass = computed(() => ({
    'font-english-bold': locale.value === 'en',
    'font-georgian-bold': locale.value === 'ka'
  }))

  const mediumFontClass = computed(() => ({
    'font-english-medium': locale.value === 'en',
    'font-georgian-medium': locale.value === 'ka'
  }))

  return {
    locale,
    setLocale,
    boldFontClass,
    mediumFontClass,
    isCurrentLocaleKa
  }
})
