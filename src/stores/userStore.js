import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useUserStore = defineStore("user", () => {
	const userInfo = ref(
		useStorage("vueUseUser", {
			displayName: "User",
			interest: "Interest ?",
			bio: "",
			pronouns: "",
			profilePicture: "https://placehold.co/400x400.png", 
		})
	);

	const watchlist = ref(useStorage("vueUseUserWatchlist", []));

	const getStatusCount = (status) => computed(() => watchlist.value.filter(wl => wl.status === status).length)

	const getEpisodeWatched = () => computed(() => watchlist.value.reduce((acc, wl) => wl.progress + acc, 0))

	function getProgress(id) {
		return computed(() => {
			const anime = watchlist.value.find((item) => item.id === id);
			if (anime) {
				return anime.status == "Completed" ? anime.episodes : anime.progress;
			} else {
				return 0;
			}
		});
	}

	function getAnimeData(id) {
		return computed(() => {
			const anime = watchlist.value.find((item) => item.id === id);
			if (anime) {
				return anime;
			} else {
				return undefined;
			}
		});
	}

	function getAnimeDataNonComputed(id) {
		const anime = watchlist.value.find((item) => item.id === id);
		if (anime) {
			return anime;
		} else {
			return undefined;
		}
	}

	function isAnimeBookmark(id) {
		const anime = watchlist.value.find((item) => item.id === parseInt(id));
		if (anime) {
			return true;
		} else {
			return false;
		}
	}

	function addWatchList(data) {
		const isDuplicate = watchlist.value.some((item) => item.id === data.mal_id);
		console.log(data);
		if (isDuplicate) {
			// Delete anime
			deleteWatchList(data.mal_id);
		} else {
			// add to watch list
			watchlist.value.push({
				id: data.mal_id,
				status: "Interested",
				score: 0,
				progress: 0,
				episodes: data.episodes,
				data: data,
			});
		}
	}

	function deleteWatchList(id) {
		watchlist.value = watchlist.value.filter((item) => item.id !== id);
	}

	function resetUserData() {
		localStorage.removeItem("vueUseUser");
		localStorage.removeItem("vueUseUserWatchlist");
	}

	return {
		userInfo,
		watchlist,
		addWatchList,
		getStatusCount,
		deleteWatchList,
		getProgress,
		getAnimeData,
		getAnimeDataNonComputed,
		isAnimeBookmark,
		getEpisodeWatched,
		resetUserData,
	};
});
