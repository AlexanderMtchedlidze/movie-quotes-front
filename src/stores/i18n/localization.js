import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

export const useLocalization = defineStore('localize', () => {
  const { locale } = useI18n()
  const currentLocale = ref(localStorage.getItem('locale') || 'ka')

  if (localStorage.getItem('locale')) {
    locale.value = localStorage.getItem('locale')
  }

  function setLocale(value) {
    locale.value = value
    localStorage.setItem('locale', value)
    currentLocale.value = value
  }
  return {
    setLocale,
    currentLocale
  }
})
