import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home.vue';
//user
import about from '../views/user/about.vue';
import errorPage from '@/views/404.vue';
import SortoneModule from './module/Sortone'; // 排序一
import SorttwoModule from './module/Sorttwo'; // 排序二
import SortthreeModule from './module/Sortthree'; // 排序三
import SortfourModule from './module/Sortfour'; // 排序四
Vue.use(Router);

// 重组路由模块
function construction() {
    // 所有路由
    let routerModule = [
        ...SortoneModule,
        ...SorttwoModule,
        ...SortthreeModule,
        ...SortfourModule,
    ];
    routerModule.forEach(item => {
        item.meta = {};
        item.meta.title = item.title;
        item.component = () =>
            import (`@/views${item.filePath}.vue`)
    });
    return routerModule;
}

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '*',
            component: errorPage,
            redirect: { name: 'about' },
            meta: {
                title: '页面错误'
            }
        },
        {
            path: '/home',
            name: 'home',
            component: Home,
            meta: {
                title: 'HOME'
            }
        },
        {
            path: '/about',
            name: 'about',
            component: about,
            meta: {
                title: 'HOME'
            }
        },

        ...construction()
    ],

    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) return savedPosition;
        else {
            return {
                x: 0,
                y: 0
            };
        }
    }
});