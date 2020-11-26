/* public store commit Methods */

export default {
	setUserInfo(state, val) {
		state.user_Info = val;
	},

	// 设置用户信息
	SET_USER_INFO(state, userInfo = {}) {
		state.userInfo = userInfo;
		localStorage.setItem("userInfo", JSON.stringify(userInfo));
	},

	// 设置access_token
	SET_ACCESS_TOKEN(state, access_token) {
		state.access_token = access_token;
		localStorage.setItem("access_token", access_token);
	},

	SET_MODULE_LIST(state, value = []) {
		state.moduleList = value;
	},

	SET_PAGE_CONFIG(state, value = {}) {
		state.pageConfig = value;
	}
};
