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
			path: "/search",
			name: "search",
			component: () => import("../views/SearchView.vue"),
		},
		{
			path: "/category/:type",
			name: "category",
			component: () => import("../views/CategoryView.vue"),
		},
		{
			path: "/profile",
			name: "profile",
			component: () => import("../views/UserView.vue"),
		},
		{
			path: "/anime/:id",
			name: "anime",
			component: () => import("../views/AnimeView.vue"),
		},
	],
});

export default router;
