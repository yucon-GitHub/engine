<template>
	<div class="module-swipe">
		<div class="content">
			<!--<swiper-->
			<!--ref="swiper"-->
			<!--:options="options"-->
			<!--:style="{ height: $attrs.item.height + 'px' }"-->
			<!--&gt;-->
			<!--<swiper-slide-->
			<!--v-for="(item, index) in $attrs.item.list"-->
			<!--:key="index"-->
			<!--&gt;-->
			<!--<img :src="item.src" class="full-width block" />-->
			<!--</swiper-slide>-->

			<!--<div-->
			<!--class="swiper-pagination"-->
			<!--slot="pagination"-->
			<!--v-if="$attrs.item.showIndicators"-->
			<!--&gt;</div>-->
			<!--</swiper>-->
		</div>
	</div>
</template>

<script>
export default {
	name: "module-swipe",

	props: {
		moduleItem: {
			type: Object,
			default: () => {}
		}
	},

	data() {
		return {
			options: {}
		};
	},

	created() {
		this.options = {
			loop: this.$attrs.item.loop,
			autoplay: this.$attrs.item.autoplay
				? {
						delay: this.$attrs.item.interval * 1000
				  }
				: false,
			pagination: {
				el: ".swiper-pagination"
			}
		};
	},

	methods: {}
};
</script>

<style lang="scss" scoped>
.module-swipe {
	/*/deep/ .el-carousel__button {*/
	/*width: 6px !important;*/
	/*height: 6px;*/
	/*border-radius: 50%;*/
	/*}*/

	.config-img-list {
		img {
			width: 100px;
			height: 80px;
			object-fit: contain;
		}

		.delete-img-icon {
			position: absolute;
			right: 15px;
			top: 15px;
		}
	}
}
</style>
