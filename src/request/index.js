import axios from 'axios';
import router from '@/router/index';
import reConfig from '@/request/config';
import qs from 'qs';
import Vue from 'vue';
import { Toast } from "vant"
/**
 * axios 二次封装
 * @params: prefix = 请求域名前缀符(API版本号)；config = 请求配置，目前支持loading，请求头Content-Type
 */
export default function(prefix = reConfig.apiPrefix, config = {}) {
    // 请求携带是否需要loading
    let { loading } = config;
    //忽略序列化列表
    let ignoreQs = ['multipart/form-data', 'application/json'];
    // 创建一个axios实例 config、prefix 为独立请求的配置
    const INSTANCES = _axiosConfig(prefix, config);
    // request 拦截器
    INSTANCES.interceptors.request.use(
        config => {
            if (loading) Vue.prototype.Toast.loading({ message: '加载中' });
            return config;
        },
        function(error) {
            return Promise.reject(error);
        }
    );

    // response 拦截器
    INSTANCES.interceptors.response.use(
        function(response) {
            let { data } = response;
            if (data && data.code === 404) {
                console.log('404');
                router.replace({
                    // 跳转404或登陆页面
                    name: '404'
                });
                return;
            }
            // 错误提示
            if (response.data.message && response.data.code !== 200) {
                Vue.prototype.Toast(response.data.message);
            }
            Vue.prototype.Toast.clear();
            return response.data;
        },
        function(error) {}
    );

    return {
        // get 请求将参数加进 config[params]
        get: (url, params, config = {}) => {
            config.params = params;
            return INSTANCES.get(url, config);
        },
        // post 请求序列化 params
        post: (url, params) => {
            //兼容上传文件
            if (ignoreQs.indexOf(config['Content-Type']) === -1) {
                params = qs.stringify(params);
            }
            return INSTANCES.post(url, params);
        },
        put: INSTANCES.put,
        patch: INSTANCES.patch
    };
}

// 重设config
function _axiosConfig(prefix, config) {
    // 默认请求头
    const DEFAULT_HEADER = {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    };
    // 需要更改请求头Content-Type 信息，在接口定义处配置config 参数: Content-Type
    axios.defaults.withCredentials = true;
    // 开发环境默认使用proxy代理请求
    axios.defaults.baseURL = process.env.NODE_ENV === 'development' && !prefix.includes('/tencentMap') ? `/proxyApi/${prefix}` : `${prefix}`;
    axios.defaults.timeout = 5000;
    config = {
        'headers': {
            'Content-Type': config['Content-Type'] || DEFAULT_HEADER['Content-Type'],
            'Access-Token': sessionStorage.getItem('token')
        },
        ...config
    };
    console.log(config);
    return axios.create(config);
}