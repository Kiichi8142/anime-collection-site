import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: HomeView,
		},
		{
			path: "/about",
			name: "about",
			component: () => import("../views/AboutView.vue"),
		},
		{
			path: "/category/:type",
			name: "category",
			component: () => import("../views/CategoryView.vue"),
		},
		{
			path: "/account/edit",
			name: "account-edit",
			component: () => import("../views/AccountSettingsView.vue"),
			requiresAuth: true,
		},
		{
			path: "/profile",
			name: "profile",
			component: () => import("../views/UserView.vue"),
			requiresAuth: true,
		},
		{
			path: "/anime/:id",
			name: "anime",
			component: () => import("../views/AnimeView.vue"),
		},
	],
});

export default router;
