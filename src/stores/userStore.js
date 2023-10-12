import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
	const information = ref({
		displayName: "Anonymous",
		interest: "",
		bio: "",
	});
	const favList = ref([]);
	const favCount = computed(() => favList.value.length);

	function addFav(id) {
		if (!favList.value.includes(id)) {
			favList.value.push(id);
		}
	}

	const watchlist = ref([]);

	function getStatusCount(statusToCount) {
		return computed(() => {
			return watchlist.value.filter((item) => item.status === statusToCount)
				.length;
		});
	}

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

	function addWatchList(data) {
		const isDuplicate = watchlist.value.some((item) => item.id === data.mal_id);
		console.log(data);
		if (isDuplicate) {
			console.log("Already added");
		} else {
			watchlist.value.push({
				id: data.mal_id,
				status: "Interested",
				progress: 0,
				episodes: data.episodes,
				data: data,
			});
		}
	}

	function deleteWatchList(id) {
		const anime = watchlist.value.some((item) => item.id === id);
		if (anime) {
			watchlist.value = watchlist.value.filter((item) => item.id !== id);
		}
	}

	return {
		favList,
		favCount,
		information,
		addFav,
		watchlist,
		addWatchList,
		getStatusCount,
		deleteWatchList,
		getProgress,
	};
});
