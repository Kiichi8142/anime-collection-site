import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
	const statusList = [
		"Plan to Watch",
		"Completed",
		"Watching",
		"Dropped",
		"On Hold",
		"Pending",
		"Interested",
	];

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

	function addWatchList(data) {
		const isDuplicate = watchlist.value.some((item) => item.id === data.mal_id);
		console.log(data);
		if (isDuplicate) {
			console.log("Already added");
		} else {
			watchlist.value.push({
				id: data.mal_id,
				status: "Interested",
				episodes: new Array(data.episodes).fill("unfinnished"),
				data: data,
			});
		}
	}

	function toggleEpStatus(id, ep) {
		const anime = watchlist.value.find((item) => item.id === id);
		console.log(anime);
		if (anime) {
			anime.episodes[ep] =
				anime.episodes[ep] === "finnished" ? "unfinnished" : "finnished";
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
		statusList,
		getStatusCount,
		deleteWatchList,
		toggleEpStatus,
	};
});
