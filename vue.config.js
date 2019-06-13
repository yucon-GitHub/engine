const path = require('path');

const resolve = dir => {
    return path.join(__dirname, dir);
};
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/production-sub-path/' : '/',
    devServer: {
        port: 8080,
        proxy: {
            '/portal': {
                // target: 'http://py.dev.yatiku.com/',
                target: 'http://192.168.99.116:8060',
                changeOrigin: true
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
