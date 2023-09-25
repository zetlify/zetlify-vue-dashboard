// OverlayScrollbar, NProgress CSS, Global CSS
import 'overlayscrollbars/overlayscrollbars.css'
import 'nprogress/nprogress.css'
import './main.css'
import './utils/axios'

import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import { abilitiesPlugin } from '@casl/vue'
import ability from './utils/ability'
import router from './router'
import App from './App.vue'

// Create Vue App
const app = createApp(App)

// Pinia & Router Binding
const pinia = createPinia()
pinia.use(({ store }) => (store.router = markRaw(router)))
app.use(pinia)

// Vue Casl
app.use(abilitiesPlugin, ability, {
  useGlobalProperties: true
})

// Router
app.use(router)

// Mount App
app.mount('#app')
