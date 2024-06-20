<script setup>
import AnimeCard from '../components/AnimeCard.vue';
import ScrollableAnimeCard from '../components/ScrollableAnimeCard.vue';

import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAnimeStore } from '@/stores/animeStore.js'
import { storeToRefs } from 'pinia';

const router = useRouter()

const animeStore = useAnimeStore()
const { fetchSeason, fetchTop } = animeStore
const { season, top } = storeToRefs(animeStore)

onMounted(async () => {
    await fetchTop()
    await fetchSeason()
})

</script>

<template>
    <div class="max-w-7xl mx-auto text-neutral-50 p-6 lg:p-8">

        <section>
            <div v-if="top.anime">
                <h1 class="font-bold text-3xl">All time popular</h1>
                <ScrollableAnimeCard :data="top.anime" />
            </div>
        </section>

        <div v-if="season.current" class="mt-8">
            <div class="flex items-end justify-between">
                <h1 class="font-bold text-3xl">Current Season</h1>
                <button @click="router.push({ name: 'current' })" class="text-neutral-400">View All</button>
            </div>
            <ScrollableAnimeCard :data="season.current" />
        </div>

        <div v-if="season.upcoming" class="mt-8">
            <div class="flex items-end justify-between">
                <h1 class="font-bold text-3xl">Upcoming</h1>
                <button @click="router.push({ name: 'upcoming' })" class="text-neutral-400">View All</button>
            </div>
            <ScrollableAnimeCard :data="season.upcoming" />
        </div>
    </div>
</template>