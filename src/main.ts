import { createApp } from 'vue'
import { router } from './router/index'
import { createPinia } from 'pinia'
import { Quasar, quasarOpts } from './libs/quasar.lib'

import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.use(Quasar, quasarOpts)
app.mount('#app')
