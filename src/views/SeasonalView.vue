<script setup>
import AnimeCardGrid from '../components/AnimeCardGrid.vue'
import { onMounted, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAnimeStore } from '../stores/animeStore';
import { animeSeason } from '../api/anime-api';

const router = useRouter()
const route = useRoute()
const animeStore = useAnimeStore()

const seasons = ref([
    { text: "Winter", value: 'winter' },
    { text: "Spring", value: 'spring' },
    { text: "Summer", value: 'summer' },
    { text: "Fall", value: 'fall' },
])

const seasonal = ref({
    year: route.params?.year || new Date().getFullYear(),
    season: route.params?.season || animeStore.getCurrentSeason()
})

const season = ref()
const pages = ref()

const fetchSeason = async (page) => {
    const seasonData = await animeSeason(seasonal.value.year, seasonal.value.season, page < 1 ? 1 : page)
    season.value = seasonData.data.data
    pages.value = seasonData.data.pagination
}

onMounted(async () => {
    await fetchSeason(route.query?.page || 1)
    router.replace({ name: 'seasonal', params: { year: seasonal.value.year, season: seasonal.value.season }, query: route.query })
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
            <div>
                <select class="bg-neutral-800 p-1 rounded-md font-medium" v-model="seasonal.season">
                    <option v-for="(season, seasonIndex) in seasons" :key="seasonIndex" :value="season.value">{{
                        season.text }}</option>
                </select>
            </div>
            <AnimeCardGrid v-if="seasonal && pages" :anime-data="season" :page-data="pages" />
        </div>
    </div>
</template>