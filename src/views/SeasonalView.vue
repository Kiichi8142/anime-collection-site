<script setup>
import { onMounted, ref, computed, defineAsyncComponent, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAnimeStore } from "../stores/animeStore";
import { animeSeason } from "../api/anime-api";
import { storeToRefs } from "pinia";

const AnimeCardGrid = defineAsyncComponent(
    () => import("../components/AnimeCardGrid.vue")
);

const PaginationControl = defineAsyncComponent(
    () => import('../components/PaginationControl.vue')
);

const LoadingDot = defineAsyncComponent(
    () => import('../components/LoadingDot.vue')
)

const router = useRouter();
const route = useRoute();
const animeStore = useAnimeStore();
const { fetchSeasonList } = animeStore;
const { seasonList } = storeToRefs(animeStore);
const isLoading = ref(true);

const selectedYear = ref(parseInt(route.query?.year) || new Date().getFullYear())
const selectedSeason = ref(route.query?.season || animeStore.getCurrentSeason(),)

const selectedSeasonData = computed(() =>
    seasonList.value.find((s) => s.year === selectedYear.value)
);

const seasonData = ref();
const pagesData = ref();

const fetchSeason = async (page) => {
    isLoading.value = true;
    try {
        const seasonResponse = await animeSeason(
            selectedYear.value,
            selectedSeason.value,
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
    selectedYear.value = parseInt(route.query?.year) || new Date().getFullYear()
    selectedSeason.value = route.query?.season || animeStore.getCurrentSeason()
    await fetchSeasonList();
    await fetchSeason(route.query?.page || 1);
});

const nextPage = async () => {
    if (pagesData.value.has_next_page) {
        router.push({ path: '/seasonal', query: { ...route.query, 'page': pagesData.value.current_page + 1 } })
    }
}

const prevPage = async () => {
    if (pagesData) {
        router.push({ path: '/seasonal', query: { ...route.query, 'page': pagesData.value.current_page - 1 } })
    }
}

watch(selectedYear, () => {
    router.push({ path: '/seasonal', query: { ...route.query, 'year': selectedYear.value } })
})

watch(selectedSeason, () => {
    router.push({ path: '/seasonal', query: { ...route.query, 'season': selectedSeason.value } })
})
</script>

<template>
    <div class="max-w-7xl mx-auto text-neutral-50 p-6 lg:p-8">
        <Transition mode="out-in">
            <div v-if="!isLoading">
                <div class="space-y-4">
                    <div class="space-y-0.5">
                        <p class="text-3xl font-semibold text-neutral-50">Seasonal Anime</p>
                        <p class="text-xl font-semibold text-neutral-400">
                            {{ selectedYear }} {{ selectedSeason.toUpperCase() }}
                        </p>
                    </div>
                    <div class="flex space-x-2">
                        <select name="year" class="bg-neutral-800 p-1 rounded-md font-medium" v-model="selectedYear">
                            <option v-for="(season, seasonIndex) in seasonList" :key="seasonIndex" :value="season.year">
                                {{ season.year }}
                            </option>
                        </select>
                        <select name="season" class="bg-neutral-800 p-1 rounded-md font-medium w-fit"
                            v-model="selectedSeason">
                            <option disabled>select season</option>
                            <option v-for="(season, seasonIndex) in selectedSeasonData.seasons" :key="seasonIndex"
                                :value="season">
                                {{ season.charAt(0).toUpperCase() + season.slice(1) }}
                            </option>
                        </select>
                    </div>
                    <div>
                        <PaginationControl :total-page="pagesData.last_visible_page"
                            :has-next-page="pagesData.has_next_page" :current-page="pagesData.current_page"
                            @next-page="nextPage" @prev-page="prevPage" />
                        <AnimeCardGrid :anime-data="seasonData" :page-data="pagesData" />
                        <PaginationControl :total-page="pagesData.last_visible_page"
                            :has-next-page="pagesData.has_next_page" :current-page="pagesData.current_page"
                            @next-page="nextPage" @prev-page="prevPage" />
                    </div>
                </div>
            </div>
            <div v-else>
                <LoadingDot></LoadingDot>
            </div>
        </Transition>
    </div>
</template>

<style>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
    @apply transition-all ease-in-out duration-300
}

.v-enter-from,
.v-leave-to {
    @apply opacity-0
}
</style>
