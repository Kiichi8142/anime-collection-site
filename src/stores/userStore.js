import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
	const information = ref({
		displayName: "Anonymous",
		interest: "",
		bio: "",
	});
	const favList = ref([]);
	return { favList, information };
});
