import axios from './axios';
import router from '@/router/index';

export default function (prefix = '', config = {}) {
    if (prefix) config['baseURL'] = prefix;
    // 请求携带是否需要loading
    let { loading } = config;
    const instances = axios(config);

    // request 拦截器
    instances.interceptors.request.use(
        config => {
            if (loading) console.log('show Loading');
            return config;
        },
        function (error) {
            return Promise.reject(error);
        }
    );

    // response 拦截器
    instances.interceptors.response.use(
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
            console.log('hide Loading');
            return response.data;
        },
        function (error) {
            return Promise.reject(error);
        }
    );

    return {
        get: (url, params, config = {}) => {
            config.params = params;
            return instances.get(url, config);
        },
        head: instances.head,
        post: instances.post,
        put: instances.put,
        patch: instances.patch
    };
}
