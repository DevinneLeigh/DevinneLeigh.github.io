import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/main.scss'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

createApp(App).use(router).mount('#app')
