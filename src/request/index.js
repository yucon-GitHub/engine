import axios from 'axios';
import router from '@/router/index';
import reConfig from '@/request/config';
import qs from 'qs';

export default function (prefix = '', config = {}) {
    // 请求携带是否需要loading
    let { loading } = config;
    // 创建一个axios实例 config、prefix 为独立请求的配置
    const INSTANCES = _axiosConfig(prefix, config);

    // request 拦截器
    INSTANCES.interceptors.request.use(
        config => {
            if (loading) console.log('show Loading');
            return config;
        },
        function (error) {
            return Promise.reject(error);
        }
    );

    // response 拦截器
    INSTANCES.interceptors.response.use(
        function (response) {
            let { data } = { ...response };
            if (data && data.code === 404) {
                console.log('404')
                router.replace({
                    // 跳转404或登陆页面
                    name: '404'
                });
                return false;
            }
            // 错误提示
            if (response.data.code !== 200) {
                console.log(response.data.message)
            }
            console.log('hide Loading');
            return response.data;
        },
        function (error) {
            return Promise.reject(error);
        }
    );

    return {
        // get 请求将参数加进 config[params]
        get: (url, params, config = {}) => {
            config.params = params;
            return INSTANCES.get(url, config);
        },
        // post 请求序列化 params
        post: (url, params) => {
            params = qs.stringify(params);
            return INSTANCES.post(url, params);
        },
        put: INSTANCES.put,
        patch: INSTANCES.patch
    };
}

// 重设config
function _axiosConfig (prefix, config) {
    // 默认请求头
    const DEFAULT_HEADER = {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    };
    axios.defaults.withCredentials = true;
    // 开发环境默认使用proxy代理请求
    axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? `${reConfig.apiPrefix}${prefix}/api` : `${reConfig.apiPrefix}${prefix}`;
    axios.defaults.timeout = 5000;
    config = {
        'headers': { 'Content-Type': config['ContentType'] || DEFAULT_HEADER['Content-Type'] },
        ...config
    };
    return axios.create();
}
