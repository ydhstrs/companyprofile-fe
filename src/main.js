import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import './registerServiceWorker'
import router from './router'
import './axios.js'
import './index.css'
import './script.js'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
