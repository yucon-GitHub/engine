/**
 * @fileName: user 路由文件
 * @author: yucon
 * @createdTime: 2019-06-14
 * @remark: 按模块文件分路由，统一导出到index配置路由
 * @rename: 命名规则：模块名称 + 路由名 (同文件名)
 *
 */

export default [
    {
        path: '/user/about',
        name: 'user/about',
        meta: {
            title: '关于我们',
            index: 1
        },
        component: () => import(/* webpackChunkName: "about" */ '@/views/user/about.vue')
    }
]
