import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios"
import './plugins/element'
import './assets/css/global.css'
import echarts from 'echarts'

Vue.prototype.$echarts = echarts

Vue.prototype.$http = axios
// 配置请求根路径
axios.defaults.baseURL = 'http://localhost:80'

Vue.config.productionTip = false


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
