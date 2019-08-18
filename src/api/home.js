import request from '@/request/index';

// 测试接口
export const testApi = () => request('', { loading: true }).get('/shop/index_goods');

export const addProduct = params => request('', { tip: false, ContentType: 'multipart' }).post('/portal/back/product/addOrUpdate', { ...params });
