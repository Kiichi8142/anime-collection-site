<script setup>
import AnimeCardGrid from '../components/AnimeCardGrid.vue'
import { onMounted, ref, watchEffect, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAnimeStore } from '../stores/animeStore';
import { animeSeason } from '../api/anime-api';
import { storeToRefs } from 'pinia';

const router = useRouter()
const route = useRoute()
const animeStore = useAnimeStore()
const { fetchSeasonList } = animeStore
const { seasonList } = storeToRefs(animeStore)

const seasonal = ref({
    year: route.params?.year || new Date().getFullYear(),
    season: route.params?.season || animeStore.getCurrentSeason()
})

const currentSeason = computed(() => seasonList.value.find((s) => s.year === parseInt(seasonal.value.year)));

const seasonData = ref()
const pagesData = ref()

const fetchSeason = async (page) => {
    const seasonResponse = await animeSeason(seasonal.value.year, seasonal.value.season, page < 1 ? 1 : page)
    seasonData.value = seasonResponse.data.data
    pagesData.value = seasonResponse.data.pagination
}

onMounted(async () => {
    router.replace({ name: 'seasonal', params: { year: seasonal.value.year, season: seasonal.value.season }, query: route.query })
    await fetchSeasonList()
    await fetchSeason(route.query?.page || 1)
})

watchEffect(async () => {
    await fetchSeason(route.query?.page)
})

</script>

<template>
    <div class="max-w-7xl mx-auto text-neutral-50 p-6 lg:p-8">
        <div v-if="seasonal.year && seasonal.season" class="space-y-4">
            <div class="space-y-0.5">
                <p class="text-3xl font-semibold text-neutral-50">Seasonal Anime</p>
                <p class="text-xl font-semibold text-neutral-400">{{ seasonal.year }} {{ seasonal.season.toUpperCase()
                    }}</p>
            </div>
            <div v-if="currentSeason" class="flex space-x-2">
                <select class="bg-neutral-800 p-1 rounded-md font-medium" v-model="seasonal.year">
                    <option v-for="(season, seasonIndex) in seasonList" :key="seasonIndex" :value="season.year">{{
                        season.year }}</option>
                </select>
                <select class="bg-neutral-800 p-1 rounded-md font-medium w-fit" v-model="seasonal.season">
                    <option disabled>select season</option>
                    <option v-for="(season, seasonIndex) in currentSeason.seasons" :key="seasonIndex" :value="season">{{
                        season }}</option>
                </select>
            </div>
            <AnimeCardGrid v-if="seasonData && pagesData" :anime-data="seasonData" :page-data="pagesData" />
        </div>
    </div>
</template>