<template>
	<div id="Toast" :class="{ 'fade-out': fadeOutClass }">
		<div :class="{ mask: mask, ToastMask: type !== 'alert' && mask }">
			<!--  toast container -->
			<section
				class="toast-title left-top-center text-center"
				v-if="type !== 'alert'"
			>
				<div
					class="loading-boll"
					v-if="type === 'loading'"
					:class="loadingType"
				>
					<div
						v-if="loadingType === 'collision'"
						class="collision-group"
					>
						<div></div>
						<div></div>
						<div></div>
					</div>
				</div>
				<div
					class="toast-icon"
					v-else-if="['success', 'error'].includes(type)"
				>
					<img :src="iconPath" alt="" />
				</div>
				<div>{{ title }}</div>
			</section>

			<!-- alert container  -->
			<section v-if="type === 'alert'" class="alert left-top-center">
				<div class="content">
					{{ title }}
					<div class="text">{{ content }}</div>
				</div>
				<div class="flex btn-group flex-center">
					<button @click="cancel" class="flex-1">取消</button>
					<button @click="confirm" class="flex-1">确认</button>
				</div>
			</section>
		</div>
	</div>
</template>

<script>
export default {
	name: "toast",

	data() {
		return {
			type: "",
			title: "",
			duration: 1500,
			fadeOutClass: false,
			mask: false,
			content: "",
			loadingType: ["ring", "collision", "surround"][
				Math.floor(Math.random() * 3)
			]
		};
	},

	created() {
		if (this.type !== "loading") this.fadeOut();
	},

	computed: {
		iconPath() {
			return this.type === "success"
				? require("../../static/img/success_icon.png")
				: require("../../static/img/error_icon.png");
		}
	},

	methods: {
		// 淡出动画
		fadeOut() {
			setTimeout(() => {
				this.fadeOutClass = true;
			}, this.duration - 200);
		},

		confirm() {
			this.onConfirm && this.onConfirm("confirm");
		},
		cancel() {
			this.onCancel && this.onCancel("cancel");
			document.body.removeChild(this.$el);
		}
	}
};
</script>

<style scoped lang="scss">
.ToastMask {
	background: none;
}

.fade-out {
	.toast-title {
		animation: fadeOut 0.2s ease forwards;
		@keyframes fadeOut {
			from {
				transform: translate(-50%, -50%);
				opacity: 1;
			}
			to {
				transform: translate(-50%, -20%);
				opacity: 0;
			}
		}
	}
}

.toast-title {
	background-color: rgba($color-black, 0.9);
	padding: 10px 12px;
	border-radius: 4px;
	color: $color-white;
	animation: fadeIn 0.3s ease;
	@keyframes fadeIn {
		from {
			transform: translate(-50%, -25%);
			opacity: 0.2;
		}
		to {
			transform: translate(-50%, -50%);
			opacity: 1;
		}
	}
}

.loading-boll {
	/*--------- 旋转 ---------*/
	&.ring {
		width: 25px;
		height: 25px;
		border-style: dashed;
		border-color: $color-white;
		border-width: 3px;
		margin: 10px auto;
		border-radius: 50%;
		background: $color-warning;
		box-shadow: 0 0 3px 3px $color-white, 0 0 1px 1px $color-black inset;
		animation: loadingRota 2s linear infinite;
		@keyframes loadingRota {
			50% {
				box-shadow: 0 0 3px 3px $color-danger,
					0 0 2px 2px $color-danger inset;
			}
			to {
				transform: rotate(360deg);
			}
		}
	}

	/*--------- 球形撞击 ---------*/
	&.collision {
		.collision-group {
			width: 100%;
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			justify-content: space-between;
			margin: 10px auto;
		}

		.collision-group div {
			width: 13px;
			height: 13px;
			border-radius: 50%;
			background-color: $color-white;
		}

		.collision-group div:nth-of-type(1) {
			transform: translateX(-100%);
			animation: left-swing 0.5s ease-in alternate infinite;
		}

		.collision-group div:nth-of-type(3) {
			transform: translateX(-90%);
			animation: right-swing 0.5s ease-out alternate infinite;
		}

		@keyframes left-swing {
			50%,
			100% {
				transform: translateX(90%);
			}
		}

		@keyframes right-swing {
			50% {
				transform: translateX(-90%);
			}
			100% {
				transform: translateX(100%);
			}
		}
	}

	/*--------- 双环旋转 ---------*/
	&.surround {
		display: flex;
		width: 30px;
		height: 30px;
		border: 3px solid transparent;
		border-top-color: $color-white;
		border-bottom-color: $color-white;
		border-radius: 50%;
		margin: 10px auto;
		animation: spin 1.5s linear infinite;

		&::before {
			content: "";
			display: block;
			margin: auto;
			width: 10px;
			height: 10px;
			border: 3px solid $color-warning;
			border-radius: 50%;
			animation: pulse 1s alternate ease-in-out infinite;
		}

		@keyframes spin {
			to {
				transform: rotate(360deg);
			}
		}

		@keyframes pulse {
			from {
				transform: scale(0.5);
			}
			to {
				transform: scale(1);
			}
		}
	}
}

.toast-icon {
	img {
		width: 50px;
		margin: 0 10px;
	}
}

.alert {
	width: 70%;
	background: $color-white;
	border-radius: 4px;

	.content {
		padding: 20px 30px;
	}
	.btn-group {
		border-top: 1px solid $color-border;
		button:first-child {
			border-right: 1px solid $color-border;
		}
		button {
			border: none;
			font-size: 16px;
			padding: 10px 0;
			border-radius: 0;
		}
	}
}
</style>
