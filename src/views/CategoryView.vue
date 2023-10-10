<script setup>
import AnimeCard from '../components/AnimeCard.vue';

import axios from 'axios';
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAnimeStore } from '@/stores/animeStore.js'

const route = useRoute()
const type = route.params.type

const animeStore = useAnimeStore()

const baseURL = 'https://api.jikan.moe/v4/'
const data = ref()

const loadTop = async () => {
    const response = await axios.get('top/' + type, { baseURL: baseURL })
    data.value = response.data
    animeStore.top[type] = response.data
    console.log(data.value)
}

onMounted(() => {
    if (animeStore.top[type]) {
        data.value = animeStore.top[type]
    } else {
        loadTop()
    }
})

</script>

<template>
    <div class="max-w-7xl mx-auto text-neutral-50 p-6 lg:p-8">
        <h1 class="font-bold text-3xl">All time popular</h1>
        <div v-if="data">
            <div v-if="type != 'characters'"
                class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 place-content-center mt-4 max-w-7xl">
                <div v-for="(anime, key) in data.data.slice(0, 4)" v-bind:key="key">
                    <AnimeCard :title="anime.title" :img-url="anime.images.webp.large_image_url"
                        :title-english="anime.title_english" :id="anime.mal_id" :type="anime.type" />
                </div>
            </div>
            <div v-else
                class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 place-content-center mt-4 max-w-7xl overflow-x-auto">
                <div v-for="(chara, key) in data.data.slice(0, 4)" v-bind:key="key">
                    <AnimeCard :title="chara.name" :img-url="chara.images.webp.image_url" :title-english="chara.name_kanji"
                        type="characters" />
                </div>
            </div>
        </div>
    </div>
</template>