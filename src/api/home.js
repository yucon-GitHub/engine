/**
 * @method: request
 * @prams: 接收两个参数，第一个为接口版本号，第二个为请求配置对象(包括是否请求loading、 header里的Content-Type)
 * @method: post/get/put/patch
 * @params: 接收接口地址和入参
 */
import request from "@/request/index";

// 测试接口
export const testPhp = params => request().post("/api/Test/test", params);

// 上传图片
export const uploadFile = params =>
	request("", { ContentType: "multipart", loading: true }).post(
		"/upload/uploadFile",
		params
	);
