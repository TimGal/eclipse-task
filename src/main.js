import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { createPinia } from 'pinia'
import MoneyLib from '@/lib/money'

const pinia = createPinia()
loadFonts()

createApp(App)
  .use(pinia)
  .use(vuetify)
  .use(MoneyLib)
  .mount('#app')
