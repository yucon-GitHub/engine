import axios from "axios";
import router from "@/router/index";
import reConfig from "@/request/config";
import qs from "qs";
import { Toast, ToastHide } from "@/components/Toast";

/**
 * axios 二次封装
 * @params: prefix = 请求域名前缀符(API版本号)；config = 请求配置，目前支持loading，请求头Content-Type
 */

// 默认请求头
const DEFAULT_HEADER = {
	"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
};

// 需要用到的请求头Content-Type 信息，在接口定义处携带config 参数: ContentType
const CONTENT_TYPE = {
	json: "application/json",
	multipart: "multipart/form-data"
};

const IGNORE_QS = ["json", "multipart"];

export default function(prefix = reConfig.apiPrefix, config = {}) {
	// 请求携带是否需要loading
	let { loading = false } = config;

	// 创建一个axios实例 config、prefix 为独立请求的配置
	const INSTANCES = _axiosConfig(prefix, config);

	// request 拦截器
	INSTANCES.interceptors.request.use(
		config => {
			if (loading) Toast("请稍后", "loading");
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
				console.log("404");
				router.replace({
					// 跳转404或登陆页面
					name: "404"
				});
				return;
			}

			// 错误提示
			if (response.data.message && response.data.code !== 200) {
				Toast(response.data.message);
			}

			ToastHide();
			return response.data;
		},
		function(error) {
			ToastHide();
			Toast("请求错误，请稍后重试", "error");
			return Promise.reject(error);
		}
	);

	return {
		// get 请求将参数加进 config[params]
		get: (url, params) => {
			return INSTANCES.get(url, { params });
		},

		// post 请求序列化 params
		post: (url, params) => {
			if (!IGNORE_QS.includes(config.ContentType))
				params = qs.stringify(params);
			return INSTANCES.post(url, params);
		},

		put: INSTANCES.put,
		patch: INSTANCES.patch
	};
}

/**
 * 实例设置 axios
 * @param prefix
 * @param config
 * @returns {AxiosInstance}
 * @private
 */
function _axiosConfig(prefix, config) {
	let { ContentType = "", timeout = 5000 } = config;

	let axiosConfig = {
		timeout,

		// 开发环境默认使用proxy代理请求
		baseURL:
			process.env.NODE_ENV === "development"
				? `${prefix}/proxyApi`
				: `${reConfig.baseUrl}${prefix}`,

		headers: {
			"Content-Type":
				CONTENT_TYPE[ContentType] || DEFAULT_HEADER["Content-Type"]
		}
	};

	return axios.create(axiosConfig);
}
