<template>
	<div class="module-popup">
		<div
			class="qr-code-container box box-center mask"
			style="top: 0; height: 100%;"
			v-if="popupModal"
			@click.self="popupModal = false"
		>
			<!-- 提交手机号模式 -->
			<div
				class="radius"
				style="width: 300px"
				v-if="qrCodeConfig.type === 2"
			>
				<div
					class="text-center pt-20 pb-20 pr-10 pl-10"
					:style="{ background: qrCodeConfig.themeColor }"
				>
					<p class="bind-tel-title fz-20 font-bold ">
						{{ qrCodeConfig.bindTelTitle }}
					</p>

					<div class="box box-column-center box-center mt-15 fz-16">
						<span class="cl-white mr-15">手机号码</span>
						<div class="radius p-10 bcl-white box-1">
							<input
								placeholder="请输入手机号"
								v-model="userTel"
								@keyup="
									() =>
										(userTel = userTel
											.replace(/[^0-9]/g, '')
											.substring(0, 11))
								"
							/>
						</div>
					</div>
				</div>

				<div class="bcl-white text-center pt-15 pb-15 pr-40 pl-40">
					<div
						class="pointer radius container full-width cl-white fz-16"
						:style="{ background: qrCodeConfig.themeColor }"
						@click="submitTel(qrCodeConfig)"
					>
						提交
					</div>
				</div>
			</div>

			<!-- 默认模式 -->
			<div
				class="relative text-center"
				ref="preview"
				style="width: 80vw;"
				v-else
			>
				<img :src="qrCodeConfig.codeBg" class="code-bg full-width" />

				<img
					class="code-img"
					:src="qrCodeGroup[`no${qrCodeConfig.linkQrCodeNo}`]"
					:style="{
						left: qrCodeConfig.left + '%',
						top: qrCodeConfig.top + '%'
					}"
					v-if="qrCodeConfig.showQr"
				/>

				<div
					class="code-text fz-20 font-bold"
					v-if="qrCodeConfig.showWxNumber"
					:style="{
						top: qrCodeConfig.wxNumberTop + '%'
					}"
					@click="
						copyWxNumber(
							qrCodeGroup[
								`wxNumberNo${qrCodeConfig.linkQrCodeNo}`
							]
						)
					"
				>
					{{ qrCodeGroup[`wxNumberNo${qrCodeConfig.linkQrCodeNo}`] }}
				</div>

				<div
					class="code-img"
					v-for="(item, index) in qrCodeConfig.domList"
					:key="index"
					:style="{
						left: item.left + '%',
						top: item.top + '%',
						width: item.width + '%'
					}"
					@click="$emit('operate', item)"
				>
					<img :src="item.src" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { setClipboardData } from "web-common-library/js/clipboard";
import mixinsData from "../mixin";
export default {
	name: "module-popup",

	mixins: [mixinsData],

	data() {
		return {
			popupModal: false,
			qrCodeConfig: {},

			userTel: ""
		};
	},

	methods: {
		/**
		 * 打开弹出层
		 * @param item
		 */
		showPopup(item) {
			let popups = this.moduleList.find(
				item => item.componentName === "popup"
			);
			this.qrCodeConfig = popups.list[item.qrCodeIndex];

			// 提交手机号模式已验证手机号执行后续交互
			if (
				this.qrCodeConfig.type === 2 &&
				localStorage.getItem(
					`loginByTel_${this.$route.params.id ||
						this.$route.query.pageId}`
				)
			) {
				this.popupModal = false;
				return this.$emit("operate", this.qrCodeConfig);
			}

			this.popupModal = true;
		},

		/**
		 * 打开默认弹窗
		 * @param item
		 */
		showDefaultPopup(item) {
			this.qrCodeConfig = item;
			this.popupModal = true;
		},

		/**
		 * 复制老师微信号
		 */
		copyWxNumber(wxNumber) {
			if (wxNumber) {
				setClipboardData(wxNumber)
					.then(() => {
						this.$toast("已复制老师微信，快去添加吧~");
					})
					.catch(() => {
						this.$toast("复制失败，请稍后重试");
					});
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.module-popup {
	.qr-code-container {
		z-index: 100;

		.code-img {
			position: absolute;
			left: 0;
			top: 0;
			width: 65%;
		}
	}

	.bind-tel-title {
		letter-spacing: 2px;
		color: #fff1e0;
		text-stroke: 2px #ffffff;
	}
}
</style>
