<!-- 模块出口，便于外部遍历获取 -->
<template>
	<div class="module-index">
		<!-- image -->
		<module-image
			v-bind="$attrs"
			v-on="$listeners"
			v-if="$attrs.item.componentName === 'image'"
		></module-image>

		<!-- text -->
		<module-text
			v-bind="$attrs"
			v-on="$listeners"
			v-if="$attrs.item.componentName === 'text'"
		></module-text>

		<!-- video -->
		<module-video
			v-bind="$attrs"
			v-on="$listeners"
			v-if="$attrs.item.componentName === 'video'"
		></module-video>

		<!-- swipe -->
		<module-swipe
			v-bind="$attrs"
			v-on="$listeners"
			v-if="$attrs.item.componentName === 'swipe'"
		></module-swipe>

		<!-- customize -->
		<module-customize
			v-bind="$attrs"
			v-on="$listeners"
			v-if="
				$attrs.item.componentName === 'customize' ||
					$attrs.item.componentName === 'customizeAbsolute'
			"
		></module-customize>

		<!-- button -->
		<module-button
			v-bind="$attrs"
			v-on="$listeners"
			v-if="$attrs.item.componentName === 'button'"
		></module-button>
	</div>
</template>

<script>
const ModuleImage = () => import("../modules/image");
const ModuleText = () => import("../modules/text");
const ModuleSwipe = () => import("../modules/swipe");
const ModuleVideo = () => import("../modules/video");
const ModuleCustomize = () => import("../modules/customize");
const ModuleButton = () => import("../modules/button");

export default {
	name: "index",

	components: {
		ModuleImage,
		ModuleText,
		ModuleSwipe,
		ModuleVideo,
		ModuleCustomize,
		ModuleButton
	},

	data() {
		return {
			qrCodeConfig: {}
		};
	}
};
</script>
