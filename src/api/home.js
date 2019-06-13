import request from '@/request/index'

// 测试接口
export const testApi = (params) => request('', { loading: true }).get('/portal/user/list/userList', params);
