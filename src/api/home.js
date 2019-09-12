import request from '@/request/index';

// 测试接口
export const testPhp = params => request('').post('api/Test/test', params);
