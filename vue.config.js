const path = require('path');

const resolve = dir => {
    return path.join(__dirname, dir);
};

module.exports = {
    // 生成环境部署路径，默认服务器根目录
    publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',

    // 静态资源存放路径，对应部署路径
    assetsDir: 'static',

    chainWebpack: config => {
        // 快捷路径地址，可自定义键值对
        config.resolve.alias.set('@', resolve('src'));
        // 项目启动提示
        console.log('项目正在启动!!!');
        console.log('项目正在启动!!!');
        console.log('项目正在启动!!!');
    },

    // 本地环境代理地址
    devServer: {
        port: 8000,
        proxy: {
            '/proxyApi': {
                target: 'http://81.69.12.254:8100/api',
                changeOrigin: true,
                pathRewrite: {
                    '^/proxyApi': '/'
                }
            }
        }
    },

    css: {
        loaderOptions: {
            // 全局引入 scss 主题色变量 及 mixin 混合器
            sass: {
                data: `@import "~@/static/style/theme.scss";@import "~@/static/style/mixin.scss";@import "@/static/style/variable.scss";`
            },
            postcss: {
                plugins: [
                    // px自动转换rem 插件
                    require('postcss-px2rem')({
                        remUnit: 37.5
                    })
                ]
            }
        }
    },

    lintOnSave: false
};
