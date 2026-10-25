import { createApp } from 'vue'

import { createPinia } from 'pinia'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'

import './style.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(Antd,{
    theme:{
        token:{
            colorPrimary: '#e96958', colorLink: '#e96958', colorLinkHover: '#f17d6d', colorLinkActive: '#d95b4b'
        }
    }
})

app.use(router)

app.use(createPinia())

app.mount('#app')