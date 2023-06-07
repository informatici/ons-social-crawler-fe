import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import ApiService from '@/core/services/ApiService'
import { initVeeValidate } from '@/core/plugins/vee-validate'
import i18n from '@/core/plugins/i18n'

import 'bootstrap'
import './assets/css/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

ApiService.init(app)
initVeeValidate()

app.mount('#app')
