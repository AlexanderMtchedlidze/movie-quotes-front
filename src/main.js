import './assets/main.css'

import { createApp, defineAsyncComponent } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import i18n from './i18n'

const app = createApp(App)

app.component(
  'LangDropdown',
  defineAsyncComponent(() => import('./components/LangDropdown.vue'))
)

app.component(
  'ActionButton',
  defineAsyncComponent(() => import('./components/ActionButton.vue'))
)

app.component(
  'BaseDialog',
  defineAsyncComponent(() => import('./components/BaseDialog.vue'))
)

app.component(
  'TextInput',
  defineAsyncComponent(() => import('./components/TextInput.vue'))
)

app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')
