<script setup>
import SeasonalAnime from '../components/SeasonalAnime.vue';

import axios from 'axios';
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const year = ref(route.params.year)
const season = ref(route.params.season)
const seasonList = ref()

const baseURL = 'https://api.jikan.moe/v4/'
const details = ref()
const animeList = ref()

const loadSeasonList = async () => {
    const response = await axios.get('seasons', { baseURL: baseURL })
    seasonList.value = response.data.data
    console.log(seasonList.value)
}

loadSeasonList()

const loadCurrent = async () => {
    const response = await axios.get('seasons/now', { baseURL: baseURL, params: { sfw: true, filter: "tv" } })
    details.value = response.data
    animeList.value = response.data.data
    console.log(animeList.value)
}

const loadSeason = async () => {
    const response = await axios.get('seasons', { baseURL: baseURL, params: { sfw: true, filter: "tv", params: { year: year.value ? '2023' : year.value, season: season.value } } })
    details.value = response.data
    animeList.value = response.data.data
    console.log(animeList.value)
}

if (season.value) {
    if (year.value) {
        loadSeason()
    } else {
        loadSeason()
    }
} else {
    loadCurrent()
}

async function loadMore() {
    if (details.value.pagination.has_next_page) {
        try {
            const response = await axios.get('seasons/now', { baseURL: baseURL, params: { sfw: true, filter: "tv", page: details.value.pagination.current_page + 1 } })
            details.value = response.data
            const newDetails = response.data
            const combine = [...animeList.value, ...newDetails.data]
            animeList.value = combine
            details.value = newDetails
        } catch (error) {
            console.log(error)
        }
    }
}

</script>

<template>
    <div class="max-w-7xl mx-auto text-neutral-50 p-6 lg:p-8">
        <h1 class="font-medium text-xl text-neutral-400">Current Season</h1>
        <SeasonalAnime @loadNextPage="loadMore" v-if="animeList" :animelist="animeList"
            :has_next_page="details.pagination.has_next_page" />
    </div>
</template>