<script setup>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import { ref } from 'vue'
import axios from 'axios';
import AnimeCard from './AnimeCard.vue';
const props = defineProps(['category'])
const currentTab = ref(0)

const baseURL = 'https://api.jikan.moe/v4/'

const PageData = ref({
    tv: '',
    movie: '',
    ona: ''
})

const AnimeList = ref({
    tv: '',
    movie: '',
    ona: ''
})

const categories = ref({
    TV: [],
    Movies: [],
    OVA: [],
})

const loadCurrent = async () => {
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const delayBetweenRequests = 500;

    const resTV = await axios.get('seasons/' + props.category, { baseURL: baseURL, params: { sfw: true, filter: 'tv' } })
    PageData.value.tv = resTV.data.pagination
    AnimeList.value.tv = resTV.data.data

    await delay(delayBetweenRequests);

    const resMovie = await axios.get('seasons/' + props.category, { baseURL: baseURL, params: { sfw: true, filter: 'movie' } })
    PageData.value.movie = resMovie.data.pagination
    AnimeList.value.movie = resMovie.data.data

    await delay(delayBetweenRequests);

    const resONA = await axios.get('seasons/' + props.category, { baseURL: baseURL, params: { sfw: true, filter: 'ona' } })
    PageData.value.ona = resONA.data.pagination
    AnimeList.value.ona = resONA.data.data

    console.log(PageData.value)
    console.log(AnimeList.value)
}

loadCurrent()

async function loadMore(type) {
    console.log("load more page", type)
    if (PageData.value[type].has_next_page) {
        try {
            const response = await axios.get('seasons/' + props.category, { baseURL: baseURL, params: { sfw: true, type: type, page: PageData.value[type].current_page + 1 } })
            PageData.value[type] = response.data.pagination
            const newDetails = response.data
            const combine = [...AnimeList.value[type], ...newDetails.data]
            AnimeList.value[type] = combine
        } catch (error) {
            console.log(error)
        }
    }
}

</script>

<template>
    <div class="flex flex-col">
        <TabGroup>
            <TabList class="flex flex-col md:flex-row border-b border-neutral-800">
                <Tab v-for="category in Object.keys(categories)" as="template" :key="category" v-slot="{ selected }">
                    <button :class="{ 'border-green-600': selected }"
                        class="border-b font-medium text-xl border-neutral-800 py-2 px-6">
                        {{ category }}
                    </button>
                </Tab>
            </TabList>

            <TabPanels>
                <TabPanel>
                    <div class="flex flex-col">
                        <div
                            class="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 place-content-center max-w-7xl">
                            <div v-for="(anime, key) in AnimeList.tv" v-bind:key="key">
                                <AnimeCard :title="anime.title" :img-url="anime.images.webp.large_image_url"
                                    :title-english="anime.title_english" :id="anime.mal_id" :type="anime.type" />
                            </div>
                        </div>
                        <button @click="loadMore('tv')" v-if="PageData['tv'].has_next_page"
                            class="px-4 py-2 mt-4 bg-green-600 hover:bg-green-700 text-neutral-100 rounded-md w-fit mx-auto font-medium">Show
                            More</button>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div class="flex flex-col">
                        <div
                            class="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 place-content-center max-w-7xl">
                            <div v-for="(anime, key) in AnimeList.movie" v-bind:key="key">
                                <AnimeCard :title="anime.title" :img-url="anime.images.webp.large_image_url"
                                    :title-english="anime.title_english" :id="anime.mal_id" :type="anime.type" />
                            </div>
                        </div>
                        <button @click="loadMore('movie')" v-if="PageData['movie'].has_next_page"
                            class="px-4 py-2 mt-4 bg-green-600 hover:bg-green-700 text-neutral-100 rounded-md w-fit mx-auto font-medium">Show
                            More</button>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div class="flex flex-col">
                        <div
                            class="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 place-content-center max-w-7xl">
                            <div v-for="(anime, key) in AnimeList.ona" v-bind:key="key">
                                <AnimeCard :title="anime.title" :img-url="anime.images.webp.large_image_url"
                                    :title-english="anime.title_english" :id="anime.mal_id" :type="anime.type" />
                            </div>
                        </div>
                        <button @click="loadMore('ona')" v-if="PageData['ona'].has_next_page"
                            class="px-4 py-2 mt-4 bg-green-600 hover:bg-green-700 text-neutral-100 rounded-md w-fit mx-auto font-medium">Show
                            More</button>
                    </div>
                </TabPanel>
            </TabPanels>
        </TabGroup>
    </div>
</template>