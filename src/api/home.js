import request from '@/request/index';

// 测试接口
export const testApi = params => request('', { loading: true, ContentType: 'multipart' }).get('/portal/user/list/userList', params);

export const addProduct = params => request('', { tip: false }).post('/portal/back/product/addOrUpdate', { ...params });
