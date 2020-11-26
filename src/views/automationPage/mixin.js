import { mapState, mapMutations } from "vuex";

export default {
	methods: {
		...mapMutations([
			"SET_MODULE_LIST",
			"SET_PAGE_CONFIG",
			"SET_QR_CODE_GROUP"
		])
	},

	computed: {
		...mapState([
			"userInfo",
			"access_token",
			"moduleList",
			"pageConfig",
			"qrCodeGroup"
		])
	}
};
