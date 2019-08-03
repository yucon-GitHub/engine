import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import errorPage from '@/views/404.vue';
import userModule from './module/user'; // user路由模块

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '*',
            component: errorPage,
            redirect: { name: 'home' },
            meta: {
                title: '页面错误'
            }
        },
        {
            path: '/',
            name: 'home',
            component: Home,
            meta: {
                title: 'HOME',
                index: 0
            }
        },

        ...userModule
    ],

    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) return savedPosition;
        else {
            return {
                x: 0,
                y: 0
            }
        }
    }
})
