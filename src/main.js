import './assets/main.css'

import { createApp, defineAsyncComponent } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import i18n from './i18n'
import './config/vee validate/rules.js'

const app = createApp(App)

app.component(
  'LangDropdown',
  defineAsyncComponent(() => import('./components/ui/dropdown/LangDropdown.vue'))
)

app.component(
  'ActionButton',
  defineAsyncComponent(() => import('./components/ui/button/ActionButton.vue'))
)

app.component(
  'BaseDialog',
  defineAsyncComponent(() => import('./components/ui/dialog/BaseDialog.vue'))
)

app.component(
  'TextInput',
  defineAsyncComponent(() => import('./components/ui/form/TextInput.vue'))
)

app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')
