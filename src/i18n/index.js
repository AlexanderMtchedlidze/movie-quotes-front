import { createI18n } from 'vue-i18n'
import en from './en'
import ka from './ka'

const messages = {
  en,
  ka
}

const i18n = createI18n({
  globalInjection: true,
  legacy: false,
  locale: 'ka',
  fallbackLocale: 'en',
  messages
})

export default i18n
