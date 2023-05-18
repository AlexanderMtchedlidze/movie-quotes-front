import './assets/main.css'

import { createApp, defineAsyncComponent } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.component(
  'LangDropdown',
  defineAsyncComponent(() => import('./components/dropdown/LangDropdown.vue'))
)

app.component(
  'ActionButton',
  defineAsyncComponent(() => import('./components/ActionButton.vue'))
)

app.use(createPinia())
app.use(router)

app.mount('#app')
