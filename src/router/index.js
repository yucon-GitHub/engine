import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";
import errorPage from "@/views/404.vue";
import userModule from "./module/user"; // user路由模块
Vue.use(Router);

// 重组路由模块
function construction() {
	// 所有路由
	let routerModule = [...userModule];
	routerModule.forEach(item => {
		item.meta = {};
		item.meta.title = item.title;
		item.component = () => import(`@/views${item.filePath}.vue`);
	});
	return routerModule;
}

export default new Router({
	mode: "history",
	base: process.env.BASE_URL,
	routes: [
		{
			path: "*",
			component: errorPage,
			redirect: { name: "home" },
			meta: {
				title: "页面错误"
			}
		},
		{
			path: "/",
			name: "home",
			component: Home,
			meta: {
				title: "HOME"
			}
		},

		{
			path: "/automationPage/:id?",
			name: "automationPageIndex",
			component: () => import("@/views/automationPage/index.vue")
		},

		...construction()
	],

	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) return savedPosition;
		else {
			return {
				x: 0,
				y: 0
			};
		}
	}
});
