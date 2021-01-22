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
const MODULES = require.context("../modules", false, /\.vue$/);

let components = {};
MODULES.keys().forEach(key => {
	components[MODULES(key).default.name] = MODULES(key).default;
});

export default {
	name: "index",

	components,

	data() {
		return {
			qrCodeConfig: {}
		};
	}
};
</script>
