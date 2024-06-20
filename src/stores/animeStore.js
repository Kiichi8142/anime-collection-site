import { ref } from "vue";
import { defineStore } from "pinia";
import { seasonNow, seasonUpcoming, topAnime, animeRecentRecommendation } from "../api/anime-api";

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

	const recommendations = ref({
		anime: "",
		manga: "",
	})

	const fetchRecommendation = async () => {
		const animeRecommendResponse = await animeRecentRecommendation();
		recommendations.value.anime = animeRecommendResponse.data.data
	}

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

	const getSeasonIndex = (month) => {
		return Math.floor((month + 1) % 12 / 3)
	}

	const getCurrentSeason = () => {
		const seasons = ['winter', 'spring', 'summer', 'fall'];
		const currentMonth = new Date().getMonth();
		return seasons[getSeasonIndex(currentMonth)];
	}

	return { 
		season, 
		top, 
		fetchSeason, 
		fetchTop,
		fetchRecommendation,
		getCurrentSeason, 
		recommendations
	};
});
