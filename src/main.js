import './assets/main.css'

import './config/vee-validate/rules/index.js'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import i18n from './config/i18n'

import { createApp, defineAsyncComponent } from 'vue'

const app = createApp(App)

app.component(
  'LangDropdown',
  defineAsyncComponent(() => import('./components/dropdown/LangDropdown.vue'))
)

app.component(
  'ActionButton',
  defineAsyncComponent(() => import('./components/button/ActionButton.vue'))
)

app.component(
  'BaseDialog',
  defineAsyncComponent(() => import('./components/ui/BaseDialog.vue'))
)

app.component(
  'BaseStatusDialog',
  defineAsyncComponent(() => import('./components/ui/BaseStatusDialog.vue'))
)

app.component(
  'TextInput',
  defineAsyncComponent(() => import('./components/form/TextInput.vue'))
)

app.component(
  'BaseLink',
  defineAsyncComponent(() => import('./components/ui/BaseLink.vue'))
)

app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')
