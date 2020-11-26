import Vue from "vue";
import Vuex from "vuex";
import mutations from "./mutations";
import action from "./action";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		user_Info: {},
		// 模块列表
		moduleList: [],
		// 页面配置
		pageConfig: {},
		// 二维码组
		qrCodeGroup: {}
	},
	mutations,
	action
});

/* 获取多个状态辅助函数用法 */

/*
// mapState

import { mapState } from 'vuex'
computed: {
    ...mapState(['user_Info', 'others'])
}

*/

/*
// 在组件中分发 Action

import { mapActions } from 'vuex'
methods: {
    ...mapActions(["user_Info", "others"])
}
*/
