<script setup>
import SeasonalAnimeList from '../components/SeasonalAnimeList.vue'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAnimeStore } from '../stores/animeStore';

const router = useRouter()
const route = useRoute()
const year = ref('')
const season = ref('')
const animeStore = useAnimeStore()

onMounted(() => {
    year.value = route.params?.year || new Date().getFullYear();
    season.value = route.params?.season || animeStore.getCurrentSeason();
    router.replace({ name: 'seasonal', params: { year: year.value, season: season.value }, query: route.query })
})

</script>

<template>
    <div class="max-w-7xl mx-auto text-neutral-50 p-6 lg:p-8">
        <div v-if="year && season" class="space-y-4">
            <div class="space-y-0.5">
                <p class="text-3xl font-semibold text-neutral-50">Seasonal Anime</p>
                <p class="text-xl font-semibold text-neutral-400">{{ year }} {{ season.toUpperCase() }}</p>
            </div>
            <SeasonalAnimeList :year="year" :season="season" />
        </div>
    </div>
</template>