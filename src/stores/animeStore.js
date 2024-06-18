import { ref } from "vue";
import { defineStore } from "pinia";
import { seasonNow, seasonUpcoming, topAnime } from "../api/anime-api";

export const useAnimeStore = defineStore("anime", () => {
	const season = ref({
		current: "",
		upcoming: "",
	});

	const top = ref({
		anime: "",
		characters: "",
		manga: "",
	});

	const fetchSeason = async () => {
		const seasonNowResponse = await seasonNow();
		season.value.current = seasonNowResponse.data.data
		const upcomingSeasonResponse = await seasonUpcoming();
		season.value.upcoming = upcomingSeasonResponse.data.data
	}

	const fetchTop = async () => {
		const topAnimeRes = await topAnime();
		top.value.anime = topAnimeRes.data.data
	}

	return { season, top, fetchSeason, fetchTop };
});
