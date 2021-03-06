/**
 * @fileName: user 路由文件
 * @author: yucon
 * @createdTime: 2019-06-14
 * @remark: 按模块文件分路由，统一导出到index配置路由
 * @rename: 命名规则：模块名称 + 路由名 (同文件名)
 *
 */

 export default [
    /**
     * @Json 路由模块
     * @params：
     * filePath = 文件路径，页面文件夹views目录下
     * path = 访问路径
     * name = 路由命名
     * title = 页面标题
     */
    {
        title: '关于我们',
        filePath: '/user/about',
        path: '/user/about',
        name: 'userAbout',
    }
]