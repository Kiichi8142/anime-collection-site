<script setup>
import { onMounted, ref, watchEffect, computed, defineAsyncComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAnimeStore } from "../stores/animeStore";
import { animeSeason } from "../api/anime-api";
import { storeToRefs } from "pinia";

const AnimeCardGrid = defineAsyncComponent(
    () => import("../components/AnimeCardGrid.vue")
);

const router = useRouter();
const route = useRoute();
const animeStore = useAnimeStore();
const { fetchSeasonList } = animeStore;
const { seasonList } = storeToRefs(animeStore);
const isLoading = ref(false);

const seasonal = ref({
    year: parseInt(route.query?.year) || new Date().getFullYear(),
    season: route.query?.season || animeStore.getCurrentSeason(),
});

const selectedSeason = computed(() =>
    seasonList.value.find((s) => s.year === seasonal.value.year)
);

const seasonData = ref();
const pagesData = ref();

const fetchSeason = async (page) => {
    isLoading.value = true;
    try {
        const seasonResponse = await animeSeason(
            seasonal.value.year,
            seasonal.value.season,
            page < 1 ? 1 : page
        );
        seasonData.value = seasonResponse.data.data;
        pagesData.value = seasonResponse.data.pagination;
    } catch (error) {
        console.log(error);
    } finally {
        isLoading.value = false;
    }
};

onMounted(async () => {
    await fetchSeasonList();
});

const nextPage = async () => {
    if (pagesData.value.has_next_page) {
        await fetchSeason(pagesData.value.current_page + 1)
    }
}

const prevPage = async () => {
    if (pagesData) {
        await fetchSeason(pagesData.value.current_page - 1)
    }
}

watchEffect(async () => {
    await fetchSeason(route.query?.page || 1);
    router.push({ query: { year: seasonal.value.year, season: seasonal.value.season, ...route.query } })
});
</script>

<template>
    <div class="max-w-7xl mx-auto text-neutral-50 p-6 lg:p-8">
        <div v-if="seasonal.year && seasonal.season && selectedSeason">
            <div class="space-y-4">
                <div class="space-y-0.5">
                    <p class="text-3xl font-semibold text-neutral-50">Seasonal Anime</p>
                    <p class="text-xl font-semibold text-neutral-400">
                        {{ seasonal.year }} {{ seasonal.season.toUpperCase() }}
                    </p>
                </div>
                <div class="flex space-x-2">
                    <select class="bg-neutral-800 p-1 rounded-md font-medium" v-model="seasonal.year">
                        <option v-for="(season, seasonIndex) in seasonList" :key="seasonIndex" :value="season.year">
                            {{ season.year }}
                        </option>
                    </select>
                    <select class="bg-neutral-800 p-1 rounded-md font-medium w-fit" v-model="seasonal.season">
                        <option disabled>select season</option>
                        <option v-for="(season, seasonIndex) in selectedSeason.seasons" :key="seasonIndex"
                            :value="season">
                            {{ season.charAt(0).toUpperCase() + season.slice(1) }}
                        </option>
                    </select>
                </div>
                <div>
                    <AnimeCardGrid v-if="seasonData && pagesData" :anime-data="seasonData" :page-data="pagesData"
                        @next-page="nextPage" @prev-page="prevPage" />
                </div>
            </div>
        </div>
    </div>
</template>
