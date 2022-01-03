import { createApp } from 'vue'
import { Quasar, Loading } from 'quasar'

import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

import App from './App.vue'

const myApp = createApp(App)

myApp.use(Quasar, {
    boot: ['i18n', 'axios'],
    plugins: {
        Loading
    },
    config: {
        loading: {}
    }
})

myApp.mount('#app')
