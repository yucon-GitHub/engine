/**
 * 活动配置 老师微信小号绑定用户手机
 * @param params.tel
 * @param params.adminUserWxId
 * @param params.wxUserAccId
 */
import request from "@/request/index";

export let bindTelByAdminUserWxId = params =>
	request.post("/app/v1/teaching/affairs/v2/saveTelWithAdminRecord", params);

export let checkBindStatus = params =>
	request.post("/app/v1/teaching/affairs/v2/getTelWithAdminRecord", params);

export const automationData = params =>
	request("", { ContentType: "multipart", loading: true }).get(
		"/auto_web/getContentById",
		params
	);
