import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import ApiService from '@/core/services/ApiService'
import { initVeeValidate } from '@/core/plugins/vee-validate'
import i18n from '@/core/plugins/i18n'
import ElementPlus from 'element-plus'

import 'bootstrap'

import VCalendar from 'v-calendar';
import 'v-calendar/style.css';


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.use(i18n)

// Use plugin with optional defaults
app.use(VCalendar, {})

ApiService.init(app)
initVeeValidate()

app.mount('#app')
