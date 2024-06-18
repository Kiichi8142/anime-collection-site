<script setup>
import AnimeCard from '../components/AnimeCard.vue';

import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAnimeStore } from '@/stores/animeStore.js'
import { storeToRefs } from 'pinia';

const router = useRouter()
const route = useRoute()
const type = route.params.type

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
        <div v-if="top.anime">
            <h1 class="font-bold text-3xl">All time popular</h1>
            <div
                class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 place-content-center mt-4 max-w-7xl overflow-x-auto">
                <div v-for="(anim, key) in top.anime.slice(0, 4)" v-bind:key="key">
                    <AnimeCard :title="anim.name" :img-url="anim.images.webp.large_image_url"
                        :title-english="anim.name_kanji" type="characters" :id="anim.mal_id" />
                </div>
            </div>
        </div>
        <div v-if="season.current" class="mt-8">
            <div class="flex items-end justify-between">
                <h1 class="font-bold text-3xl">Current Season</h1>
                <button @click="router.push({ name: 'current' })" class="text-neutral-400">View All</button>
            </div>
            <div
                class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 place-content-center mt-4 max-w-7xl overflow-x-auto">
                <div v-for="(chara, key) in season.current.slice(0, 4)" v-bind:key="key">
                    <AnimeCard :title="chara.name" :img-url="chara.images.webp.large_image_url"
                        :title-english="chara.name_kanji" type="characters" :id="chara.mal_id" />
                </div>
            </div>
        </div>

        <div v-if="season.upcoming" class="mt-8">
            <div class="flex items-end justify-between">
                <h1 class="font-bold text-3xl">Upcoming</h1>
                <button @click="router.push({ name: 'upcoming' })" class="text-neutral-400">View All</button>
            </div>
            <div
                class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 place-content-center mt-4 max-w-7xl overflow-x-auto">
                <div v-for="(chara, key) in season.upcoming.slice(0, 4)" v-bind:key="key">
                    <AnimeCard :title="chara.name" :img-url="chara.images.webp.large_image_url"
                        :title-english="chara.name_kanji" type="characters" :id="chara.mal_id" />
                </div>
            </div>
        </div>
    </div>
</template>