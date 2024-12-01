import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
	history: createWebHistory(),
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
			path: "/category/anime",
			name: "category",
			component: () => import("../views/CategoryAnimeView.vue"),
		},
		{
			path: "/user",
			component: () => import("../views/UserView.vue"),
			children: [
				{
					path: '',
					name: 'user',
					component: () => import("../views/users/UserInfoView.vue"),
				},
				{
					name: 'user-bookmark',
					path: 'bookmark',
					component: () => import("../views/users/UserBookmarkPanel.vue"),
				},
				{
					name: 'user-ranking',
					path: 'ranking',
					component: () => import("../views/users/UserRankingPanel.vue"),
				},
				{
					name: 'user-settings',
					path: 'settings',
					component: () => import("../views/users/UserSettingsView.vue"),
				},
			]
		},
		{
			path: "/anime/:id",
			name: "anime",
			component: () => import("../views/AnimeView.vue"),
		},
		{
			path: "/current",
			name: "current",
			component: () => import("../views/SeasonalView.vue"),
		},
		{
			path: "/seasonal",
			name: "seasonal",
			component: () => import("../views/SeasonalView.vue"),
		},
		{
			path: "/upcoming",
			name: "upcoming",
			component: () => import("../views/UpcomingView.vue"),
		},
	],
});

export default router;
