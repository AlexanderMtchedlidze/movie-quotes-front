import { watch } from 'vue'
import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n'
import { setLocale as setVeeValidateLocale } from '@vee-validate/i18n'

export const useLocalization = defineStore('localizationStore', () => {
  const { locale } = useI18n()

  watch(locale, (newLocale) => {
    localStorage.setItem('locale', newLocale)
  })

  function setLocale(value) {
    locale.value = value
    setVeeValidateLocale(value)
  }

  return {
    locale,
    setLocale
  }
})
