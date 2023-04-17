import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import ApiService from '@/core/services/ApiService'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
ApiService.init(app)

app.mount('#app')
