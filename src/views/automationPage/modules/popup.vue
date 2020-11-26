<template>
	<div class="module-popup">
		<div
			class="qr-code-container box box-center mask"
			style="top: 0; height: 100%;"
			v-if="popupModal"
			@click="popupModal = false"
		>
			<div
				class="relative text-center"
				ref="preview"
				style="width: 80vw;"
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
import mixinsData from "../mixin";
export default {
	name: "module-popup",

	mixins: [mixinsData],

	data() {
		return {
			popupModal: false,
			qrCodeConfig: {}
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
			this.popupModal = true;
		},

		/**
		 * 打开默认弹窗
		 * @param item
		 */
		showDefaultPopup(item) {
			this.qrCodeConfig = item;
			this.popupModal = true;
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
}
</style>
