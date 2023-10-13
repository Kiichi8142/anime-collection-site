<script setup>
import { StarIcon, ClockIcon, CalendarIcon, BookmarkIcon } from '@heroicons/vue/20/solid';
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import axios from 'axios';
import { useUserStore } from '../stores/userStore';

const userStore = useUserStore()

const route = useRoute()
const id = route.params.id
const detail = ref()

const baseURL = 'https://api.jikan.moe/v4/'
const loadDetail = async () => {
    const response = await axios.get('anime/' + id + '/full', { baseURL: baseURL })
    detail.value = response.data.data
    console.log(response.data.data)
}

loadDetail()

function addToList() {
    const data = {
        ...detail.value
    }
    userStore.addWatchList(data)
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
        <div v-if="detail" class="flex flex-col w-full p-8 border border-neutral-800 rounded-md mt-8">
            <p class="text-xl font-base text-neutral-400">Details</p>
            <hr class="mt-4 mb-4 bg-neutral-800 border-0 h-px">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div class="grid grid-cols-1 md:grid-cols-4">
                    <p class="font-medium text-neutral-100 text-base">Title</p>
                    <div class="md:col-span-3 grid gap-2 text-neutral-400 h-fit">
                        <div class="grid grid-cols-2" v-for="(title, index) in detail.titles" :key="index">
                            <p class="">{{ title.type }}</p>
                            <p class="">{{ title.title }}</p>
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-1 items-start gap-2">
                    <div class="grid grid-cols-2 md:grid-cols-4 items-end">
                        <p class="font-medium text-neutral-100 text-base">Source</p>
                        <p class=" text-neutral-400">{{ detail.source }}</p>
                    </div>
                    <div class="grid grid-cols-2 md:grid-cols-4 items-end">
                        <p class="font-medium text-neutral-100 text-base">Season</p>
                        <p class=" text-neutral-400">{{ detail.season }}</p>
                    </div>
                    <div class="grid grid-cols-2 md:grid-cols-4 items-end">
                        <p class="font-medium text-neutral-100 text-base">Episodes</p>
                        <p class=" text-neutral-400">{{ detail.episodes }}</p>
                    </div>
                    <div class="grid grid-cols-2 md:grid-cols-4 items-end">
                        <p class="font-medium text-neutral-100 text-base">Duration</p>
                        <p class=" text-neutral-400">{{ detail.duration }}</p>
                    </div>
                    <div class="grid grid-cols-2 md:grid-cols-4 items-end">
                        <p class="font-medium text-neutral-100 text-base">Type</p>
                        <p class=" text-neutral-400">{{ detail.type }}</p>
                    </div>
                    <div class="grid grid-cols-2 md:grid-cols-4 items-end">
                        <p class="font-medium text-neutral-100 text-base">Rating</p>
                        <p class="md:col-span-3 text-neutral-400">{{ detail.rating }}</p>
                    </div>
                </div>
                <div class="grid grid-cols-2 md:grid-cols-4">
                    <p class="font-medium text-neutral-100 text-base">Producers</p>
                    <div class="text-neutral-400 items-end">
                        <div v-for="(producer, index) in detail.producers" :key="index">
                            <p>{{ producer.name }}</p>
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-4">
                    <p class="font-medium text-neutral-100 text-base">Relations</p>
                    <div class="col-span-3 grid gap-2 h-fit">
                        <div class="text-neutral-400 grid grid-cols-2" v-for="(relate, index) in detail.relations"
                            :key="index">
                            <p>{{ relate.relation }}</p>
                            <div class="">
                                <p v-for="(entry, index) in relate.entry" :key="index">{{ entry.name }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-2 md:grid-cols-4">
                    <p class="font-medium text-neutral-100 text-base">Studios</p>
                    <div class="text-neutral-400">
                        <div v-for="(studio, index) in detail.studios" :key="index">
                            <p class="col-span-1">{{ studio.name }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>