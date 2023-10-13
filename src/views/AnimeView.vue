<script setup>
import AnimeDetail from '../components/AnimeDetail.vue';
import { StarIcon, ClockIcon, CalendarIcon, BookmarkIcon } from '@heroicons/vue/20/solid';
import { useRoute } from 'vue-router'
import { ref, computed } from 'vue'
import axios from 'axios';
import { useUserStore } from '../stores/userStore';

const userStore = useUserStore()

const route = useRoute()
const id = route.params.id
const detail = ref()
const characters = ref()

const sortedCharacters = computed(() => {
    const charactersCpy = characters.value
    console.log(charactersCpy)
    if (charactersCpy) {
        charactersCpy.sort((a, b) => b.favorites - a.favorites);
    }
    return charactersCpy
})
const currentLoadCharaNumber = ref(12)

const baseURL = 'https://api.jikan.moe/v4/'
const loadDetail = async () => {
    const a_response = await axios.get('anime/' + id + '/full', { baseURL: baseURL })
    detail.value = a_response.data.data
    const c_response = await axios.get('anime/' + id + '/characters', { baseURL: baseURL })
    characters.value = c_response.data.data
    console.log(c_response.data.data)
}

loadDetail()

function addToList() {
    const data = {
        ...detail.value
    }
    userStore.addWatchList(data)
}

function loadMoreChara() {
    currentLoadCharaNumber.value += 20;
}

</script>

<template>
    <div class="max-w-7xl mx-auto p-6 lg:p-8">
        <div v-if="detail" class="flex flex-col md:flex-row p-0 md:p-6 gap-x-8 rounded-md w-full">
            <div class="h-96 w-auto md:w-72 shrink-0">
                <img class="rounded-lg object-cover h-full w-full shadow-lg" :src="detail.images.webp.large_image_url"
                    alt="">
                <div class="flex items-center justify-evenly">
                    <button @click="userStore.addFav(id)" class="group p-2 flex items-center text-neutral-100 rounded-md">
                        <StarIcon class="h-6 w-6 text-neutral-700" />
                        <p class="font-medium group-hover:text-green-500">Add to favorite</p>
                    </button>
                    <button @click="addToList()" class="group p-2 flex items-center text-neutral-100 rounded-md">
                        <BookmarkIcon class="h-6 w-6 text-neutral-700" />
                        <p class="font-medium group-hover:text-green-500">Bookmark</p>
                    </button>
                </div>
            </div>
            <div class="flex flex-col mt-8 md:mt-0">
                <p class="mt-2 text-2xl lg:text-4xl text-neutral-50 font-medium">{{ detail.title_japanese }}</p>
                <div class="flex flex-col md:flex-row gap-x-2 mt-2">
                    <p class="text-neutral-200 font-medium text-base lg:text-lg flex items-center gap-x-1">
                        <StarIcon class="h-6 w-6" />{{ detail.score }}
                    </p>
                    <p class="text-neutral-200 font-medium text-base lg:text-lg flex items-center gap-x-1">
                        <CalendarIcon class="h-6 w-6" />{{ detail.status }}
                    </p>
                    <p class="text-neutral-200 font-medium text-base lg:text-lg flex items-center gap-x-1">
                        <ClockIcon class="h-6 w-6" />{{ detail.broadcast.day }}, {{ detail.broadcast.time }} (JST)
                    </p>
                </div>
                <div class="flex md:flex-row flex-wrap gap-2 mt-2">
                    <div v-for="(genre, key) in detail.genres" :key="key">
                        <p class="px-4 py-1 font-medium bg-neutral-600 text-neutral-200 rounded-md">{{ genre.name }}</p>
                    </div>
                    <div v-for="(theme, key) in detail.themes" :key="key">
                        <p class="px-4 py-1 font-medium bg-neutral-600 text-neutral-200 rounded-md">{{ theme.name }}</p>
                    </div>
                </div>
                <p class="mt-2 text-neutral-400">{{ detail.synopsis }}</p>
                <p class="text-neutral-600">source myanimelist</p>
            </div>
        </div>
        <AnimeDetail v-if="detail" :detail="detail" />
        <div v-if="sortedCharacters" class="flex flex-col w-full p-4 md:p-8 border border-neutral-800 rounded-md mt-8">
            <p class="text-xl font-base text-neutral-400">Characters ({{ sortedCharacters.length }}) </p>
            <hr class="mt-4 mb-4 bg-neutral-800 border-0 h-px">
            <div class="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-2 md:gap-8 text-neutral-100">
                <div class="flex flex-col items-center rounded-md border border-neutral-800 p-2"
                    v-for="(chara, index) in sortedCharacters.slice(0, currentLoadCharaNumber)" :key="index">
                    <img :src="chara.character.images.webp.image_url" alt="" class="object-contain w-20 md:w-auto">
                    <p class="text-center font-medium">{{ chara.character.name }}</p>
                    <p class="text-center text-neutral-400" v-if="chara.voice_actors.length">{{
                        chara.voice_actors[0].person.name }}</p>
                </div>
            </div>
            <button @click="loadMoreChara" v-if="currentLoadCharaNumber <= sortedCharacters.length"
                class="px-4 py-2 mt-4 bg-green-600 hover:bg-green-700 text-neutral-100 rounded-md w-fit mx-auto font-medium">Show
                More</button>
        </div>
    </div>
</template>