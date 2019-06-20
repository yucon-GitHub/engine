import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index'
import store from './store'
import './static/style/reset.scss'

import { filters } from '@/utils/util'

Vue.config.productionTip = false

// 添加全局过滤器
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

// 路由守卫
router.beforeEach((to, from, next) => {
    document.title = to.meta.title || 'T-JUNCTION'
    next();
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
