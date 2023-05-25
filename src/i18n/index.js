import { createI18n } from 'vue-i18n'
import en from './en'
import ka from './ka'

const messages = {
  en,
  ka
}

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages
})

export default i18n
