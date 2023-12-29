import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import ApiService from '@/core/services/ApiService'
import { initVeeValidate } from '@/core/plugins/vee-validate'
import i18n from '@/core/plugins/i18n'
import ElementPlus from 'element-plus'
import { VueCookieNext } from 'vue-cookie-next'
import VueGtag from 'vue-gtag'

import 'bootstrap'

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.use(i18n)
app.use(VueCookieNext)
app.use(VueGtag, {
  // appName: 'ONES2-AID012318-02-04-WEB',
  // pageTrackerScreenviewEnabled: true,
  config: { id: import.meta.env.VITE_APP_FIREBASE_MEASUREMENT_ID },
  router,
  enabled: true
})

app.component('VueDatePicker', VueDatePicker);

ApiService.init(app)
initVeeValidate()

// app.provide('gtag', app.config.globalProperties.$gtag)

app.mount('#app')
