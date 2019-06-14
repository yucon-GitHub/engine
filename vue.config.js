const path = require('path');

const resolve = dir => {
    return path.join(__dirname, dir);
};
module.exports = {
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
    chainWebpack: config => {
        // 快捷路径地址，可自定义键值对
        config.resolve.alias.set('@', resolve('src'));
        // 项目启动提示
        console.log('项目正在启动!!!');
        console.log('项目正在启动!!!');
        console.log('项目正在启动!!!');
    }
}
