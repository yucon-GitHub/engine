<template>
	<div class="router-view">
		<youxue-popup :close-on-mask="false" v-model="bindTelModal">
			<div class="bcl-white text-center radius" style="width: 80vw;">
				<p class="bcl-active p-15">
					为更好的服务您，请绑定您的手机号码
				</p>
				<div class="container">
					<div class="box box-column-center border container mb-15">
						手机号：
						<div class="box-1 ml-10">
							<input
								type="number"
								placeholder="请输入手机号码"
								v-model="tel"
							/>
						</div>
					</div>
					<youxue-button
						round
						type="main"
						@click="bindTel('bind')"
						style="width: 160px;"
						>确认</youxue-button
					>
				</div>
			</div>
		</youxue-popup>
	</div>
</template>

<script>
import { bindTelByAdminUserWxId, checkBindStatus } from "@/api/automationPage";
import regexp from "web-common-library/js/regexp";

export default {
	name: "bind-tel",

	data() {
		return {
			tel: "",
			bindTelModal: false
		};
	},

	created() {
		if (this.$route.query.bindWxId != 0) {
			this.checkBindStatus();
		}
	},

	methods: {
		/**
		 * 检查绑定手机状态
		 */
		async checkBindStatus() {
			let params = {
				adminUserWxId: this.$route.query.bindWxId || 0,
				wxUserAccId: this.userInfo.wxUserAccId
			};
			let { code } = await checkBindStatus(params);

			if (code === 200) {
				if (this.userInfo.tel) this.bindTel();
				else this.bindTelModal = true;
			}
		},

		/**
		 * 绑定手机
		 * @param type
		 * @returns {Promise<*>}
		 */
		async bindTel(type = "") {
			if (type === "bind" && !regexp.tel.test(this.tel))
				return this.$toast("请输入正确的手机号");

			let params = {
				tel: type === "bind" ? this.tel : this.userInfo.tel,
				adminUserWxId: this.$route.query.bindWxId || 0,
				wxUserAccId: this.userInfo.wxUserAccId
			};

			let { code } = await bindTelByAdminUserWxId(params);
			if (code === 200) {
				this.bindTelModal = false;
			}
		}
	}
};
</script>

<style scoped></style>
