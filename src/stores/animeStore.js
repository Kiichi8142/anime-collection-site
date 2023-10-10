import { ref, computed } from "vue";
import { defineStore } from "pinia";

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

	return { season, top };
});
