<template>
	<div class="router-view" :class="config.pageClassName">
		<ul class="relative">
			<li v-for="(item, index) in modules" :key="index">
				<module :item="item" :index="index" @operate="operate"></module>
			</li>
		</ul>

		<!-- popup -->
		<module-popup ref="popup" @operate="operate"></module-popup>

		<bind-tel v-if="config.isBindTel"></bind-tel>
	</div>
</template>

<script>
import wechat from "web-common-library/js/wechat";
import { infoTeacher } from "web-common-library/js/methods";
import { automationData } from "@/api/automationPage";
import mixinsData from "./mixin";
const module = () => import("./components/moduleItem");
const bindTel = () => import("./components/bindTel");
const modulePopup = () => import("./modules/popup");
export default {
	name: "index",

	mixins: [mixinsData],

	components: {
		module,
		bindTel,
		modulePopup
	},

	data() {
		return {
			bindTelModal: false,

			modules: [],
			config: {},
			qrCode: {}
		};
	},

	async created() {
		await this.getData();
		// this.initShare();

		// // 老师二维码组
		// if (this.config.qrCodeGroup && this.config.qrCodeGroup.length)
		// 	this.infoTeacher();
	},

	methods: {
		/**
		 * 获取数据
		 */
		async getData() {
			let params = {
				id: this.$route.params.id || this.$route.query.pageId
			};
			let { code, data } = await automationData(params);
			if (code === 200) {
				data = JSON.parse(data);
				this.modules = data.modules;
				this.config = data.config;
				document.title = this.config.navigationTitle;

				this.SET_MODULE_LIST(this.modules);
				this.SET_PAGE_CONFIG(this.config);

				// 检测是否有自动打开的弹窗
				let popups = this.modules.find(
					item => item.componentName === "popup"
				);
				let index =
					popups && popups.list.findIndex(item => item.defaultShow);
				if (index > -1) {
					this.$refs.popup.showDefaultPopup(popups.list[index]);
				}
			}
		},

		/**
		 * 分享配置
		 */
		initShare() {
			wechat
				.initShare({
					title: this.config.shareTitle,
					desc: this.config.shareDesc,
					imgUrl: this.config.shareIcon,
					link: location.href
				})
				.then(() => {
					console.log("分享成功");
				})
				.catch(() => {
					console.log("分享失败");
				});
		},

		/**
		 * 获取老师组二维码
		 */
		infoTeacher() {
			this.config.qrCodeGroup.forEach(async (_, index) => {
				let shareId = +this.$route.query[
					`shareId${index > 0 ? index + 1 : ""}`
				];
				if (shareId === 0) return;

				let adminUserWxId = this.$route.query[
					`adminUserWxId${index > 0 ? index + 1 : ""}`
				];

				let info = await infoTeacher({
					shareId,
					adminUserWxId,
					force: this.config.isForce
				});

				Object.assign(this.qrCode, {
					[`no${index + 1}`]: info.wxCodeUrl
				});

				this.SET_QR_CODE_GROUP(this.qrCode);
			});
		},

		/**
		 * 交互操作
		 * @param item
		 * @params item.clickType （0：无操作，1：普通跳转， 3: 支付平台跳转， 2：打开弹窗）
		 */
		operate(item) {
			if (item.clickType === 1 || item.clickType === 3) {
				let link = item.clickType === 1 ? item.link : item.toPayLink;

				// 跳转链接已选携带二维码组信息 qrCodeConfig.linkQrCodeNo 自动从链接获取
				if (item.linkQrCodeNo) {
					link += `${link.includes("?") ? "&" : "?"}shareId=${
						this.$route.query[
							`shareId${
								item.linkQrCodeNo > 1 ? item.linkQrCodeNo : ""
							}`
						]
					}&adminUserWxId=${
						this.$route.query[
							`adminUserWxId${
								item.linkQrCodeNo > 1 ? item.linkQrCodeNo : ""
							}`
						]
					}`;
				}

				// 存在有需要额外传递的参数
				if (!!item.extraParams) {
					let extraParams = item.extraParams.split(",");

					extraParams.forEach(param => {
						link += `&${param}=${this.$route.query[param] || 0}`;
					});
				}

				location.href = link;
			} else if (item.clickType === 2) {
				this.$refs.popup.showPopup(item);
			}
		}
	}
};
</script>

<style scoped></style>
