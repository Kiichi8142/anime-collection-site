<script setup>
import AnimeCard from '../components/AnimeCard.vue';

import axios from 'axios';
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAnimeStore } from '@/stores/animeStore.js'

const router = useRouter()
const route = useRoute()
const type = route.params.type

const animeStore = useAnimeStore()

const baseURL = 'https://api.jikan.moe/v4/'
const data = ref()
const season = ref()
const upcoming = ref()

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const delayBetweenRequests = 250;

const loadTop = async () => {
    const response = await axios.get('top/' + type, { baseURL: baseURL })
    data.value = response.data
    animeStore.top[type] = response.data
}

const loadSeason = async () => {
    const response = await axios.get('seasons/now', { baseURL: baseURL })
    season.value = response.data
    animeStore.season.current = response.data
}

const loadUpcoming = async () => {
    const response = await axios.get('seasons/upcoming', { baseURL: baseURL })
    upcoming.value = response.data
    animeStore.season.upcoming = response.data
}

onMounted(async () => {
    if (animeStore.top[type]) {
        data.value = animeStore.top[type]
    } else {
        loadTop()
    }

    if (animeStore.season.current) {
        season.value = animeStore.season.current
    } else {
        await delay(delayBetweenRequests);
        loadSeason()
    }

    if (animeStore.season.upcoming) {
        upcoming.value = animeStore.season.upcoming
    } else {
        await delay(delayBetweenRequests);
        loadUpcoming()
    }
})

</script>

<template>
    <div class="max-w-7xl mx-auto text-neutral-50 p-6 lg:p-8">
        <div v-if="data">
            <h1 class="font-bold text-3xl">All time popular</h1>
            <div
                class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 place-content-center mt-4 max-w-7xl overflow-x-auto">
                <div v-for="(chara, key) in data.data.slice(0, 4)" v-bind:key="key">
                    <AnimeCard :title="chara.name" :img-url="chara.images.webp.large_image_url"
                        :title-english="chara.name_kanji" type="characters" :id="chara.mal_id" />
                </div>
            </div>
        </div>
        <div v-if="season" class="mt-8">
            <div class="flex items-end justify-between">
                <h1 class="font-bold text-3xl">Current Season</h1>
                <button @click="router.push({ name: 'current' })" class="text-neutral-400">View All</button>
            </div>
            <div
                class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 place-content-center mt-4 max-w-7xl overflow-x-auto">
                <div v-for="(chara, key) in season.data.slice(0, 4)" v-bind:key="key">
                    <AnimeCard :title="chara.name" :img-url="chara.images.webp.large_image_url"
                        :title-english="chara.name_kanji" type="characters" :id="chara.mal_id" />
                </div>
            </div>
        </div>

        <div v-if="upcoming" class="mt-8">
            <div class="flex items-end justify-between">
                <h1 class="font-bold text-3xl">Upcoming</h1>
                <button @click="router.push({ name: 'upcoming' })" class="text-neutral-400">View All</button>
            </div>
            <div
                class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 place-content-center mt-4 max-w-7xl overflow-x-auto">
                <div v-for="(chara, key) in upcoming.data.slice(0, 4)" v-bind:key="key">
                    <AnimeCard :title="chara.name" :img-url="chara.images.webp.large_image_url"
                        :title-english="chara.name_kanji" type="characters" :id="chara.mal_id" />
                </div>
            </div>
        </div>
    </div>
</template>