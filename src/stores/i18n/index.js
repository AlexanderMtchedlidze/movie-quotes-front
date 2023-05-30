import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { setLocale as setVeeValidateLocale } from '@vee-validate/i18n'

export const useLocalization = defineStore('localizationStore', () => {
  const { locale } = useI18n()
  const currentLocale = ref('en')

  function setLocale(value) {
    locale.value = value
    setVeeValidateLocale(value)
    currentLocale.value = value
  }
  
  return {
    setLocale,
    currentLocale
  }
})
