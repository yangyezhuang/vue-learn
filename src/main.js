import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios"
import './plugins/element'
import './assets/css/global.css'
import VCharts from 'v-charts'

Vue.use(VCharts)


// 防止后端两次sessionID不同
axios.defaults.withCredentials = true

// 配置全局请求头
axios.interceptors.request.use(
    config => {
        let token = sessionStorage.getItem('token')
        if (token) {
            //这里面获取的请求头的键(tokenHeader)根据每个后端的习惯封装的名称各不相同
            config.headers.common['token'] = token
        }
        return config
    }, error => {
        return Promise.reject(error)
    }
)

Vue.prototype.$http = axios
// 配置请求根路径
axios.defaults.baseURL = 'http://localhost:80'

Vue.config.productionTip = false


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
