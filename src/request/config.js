/**
 * @fileName: config
 * @author: yucon
 * @createdTime: 2019-06-13
 * @remark: 项目公用配置，请求地址、网络资源路径等
*/
export default {
    baseUrl: process.env.VUE_APP_TITLE === 'TP' ? process.env.VUE_APP_URL : 'http://106.13.204.73:8100',
    apiPrefix: '', // 请求前缀，通常是版本号version,如：/api/v2
    resources: '' // 网络资源路径
};
