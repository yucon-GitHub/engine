import Vue from 'vue';
import App from './App.vue';
import router from '@/router/index';
import store from './store';
import 'lib-flexible';
import { ToastComponents, AlertComponents } from '@/components/Toast';
import Vconsole from 'vconsole';
import './static/style/reset.scss';

// 工具类--过滤器函数集
import { filters } from '@/utils/common';

Vue.config.productionTip = false;

Vue.use(ToastComponents);
Vue.use(AlertComponents);

// 添加全局过滤器
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});

if (process.env.NODE_ENV === 'development') new Vconsole();
console.log(process.env.NODE_ENV, process.env);

/* 路由守卫 */
router.beforeEach((to, from, next) => {
    document.title = to.meta.title || 'T-JUNCTION';
    if (!to.query.hasOwnProperty('time')) {
        let query = to.query;
        query.time = new Date().getTime();
        next({
            path: to.path,
            query
        });
    } else {
        next();
    }
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
