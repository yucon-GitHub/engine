const path = require('path');

const resolve = dir => {
    return path.join(__dirname, dir);
};
module.exports = {
    // 生成环境部署路径，默认服务器根目录
    publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
    chainWebpack: config => {
        // 快捷路径地址，可自定义键值对
        config.resolve.alias.set('@', resolve('src'));
        // 项目启动提示
        console.log('项目正在启动!!!');
        console.log('项目正在启动!!!');
        console.log('项目正在启动!!!');
    },
    devServer: {
        port: 8080,
        proxy: {
            '/api': {
                // target: 'http://py.dev.yatiku.com/',
                target: 'http://192.168.99.116:8060',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/'
                }
            }
        }
    },
    css: {
        loaderOptions: {
            // 全局引入 scss 主题色变量 及 mixin 混合器
            sass: {
                data: `@import "~@/static/style/theme.scss";@import "~@/static/style/mixin.scss";`
            }
        }
    }
}
