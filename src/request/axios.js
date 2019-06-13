/**
 * @param prefix url前缀
 */
import axios from 'axios';
// import reConfig from '@/request/config'

axios.defaults.withCredentials = true;
// 可以不设置请求url 默认使用proxy代理请求
// axios.defaults.baseURL = '/portal';

let defaultsHeader = 'application/x-www-form-urlencoded;charset=UTF-8';

function serialize (obj) {
    if (!obj) return '';
    let arr = [];
    let keys = Object.keys(obj);
    if (!keys.length) {
        return '';
    }
    keys.forEach(item => {
        arr.push(
            `${encodeURIComponent(item)}=${encodeURIComponent(obj[item])}`
        );
    });
    return `${arr.join('&')}`;
}

export default function (config = { timeout: 5000 }) {
    config = {
        'headers': { 'Content-Type': config['ContentType'] || defaultsHeader },
        transformRequest: [function (params, headers) {
            if (headers['Content-Type'].includes('application/x-www-form-urlencoded;charset=UTF-8')) return serialize(params);
            return JSON.stringify(params);
        }],
        paramsSerializer: function (params) {
            return serialize(params);
        },
        ...config
    };
    return axios.create(config);
};
