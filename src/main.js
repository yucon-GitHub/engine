import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index'
import store from './store'
import './static/style/reset.scss';

Vue.config.productionTip = false

// 路由守卫
router.beforeEach((to, from, next) => {
    document.title = to.meta.title || 'yucon';
    next();
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
