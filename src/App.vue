<template>
	<div id="app">
		<transition :name="transitionName" mode="out-in">
			<router-view />
		</transition>
	</div>
</template>

<script>
export default {
	name: "App",
	data() {
		return {
			transitionName: "slide-right"
		};
	},

	watch: {
		$route(to, from) {
			this.transitionName =
				to.query.t < from.query.t ? "slide-left" : "slide-right";
		}
	}
};
</script>
<style lang="scss" scoped>
#app {
	width: 100%;
	min-height: 100%;
	position: relative;
}

.slide-right-enter-active {
	animation: enter 0.3s;

	@keyframes enter {
		from {
			transform: translateX(100%);
		}

		to {
			transform: translate(0);
		}
	}
}

.slide-left-enter-active {
	animation: leave 0.3s;

	@keyframes leave {
		from {
			transform: translateX(-100%);
		}

		to {
			transform: translate(0);
		}
	}
}
</style>
