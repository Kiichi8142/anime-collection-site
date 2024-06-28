<script setup>
import { onMounted, ref, watch } from 'vue'
import AnimeCard from './AnimeCard.vue';
import { animeSeason } from '../api/anime-api';
import PaginationControl from './PaginationControl.vue';
import { useRoute } from 'vue-router';

const props = defineProps(['year', 'season'])
const route = useRoute()

const animeData = ref()

const pageData = ref()

const fetchSeason = async (page) => {
    const seasonResponse = await animeSeason(props.year, props.season, page)
    animeData.value = seasonResponse.data.data
    pageData.value = seasonResponse.data.pagination
}

onMounted(async () => {
    await fetchSeason(route.query?.page)
})

watch(
    () => route.query?.page,
    (newPage, oldPage) => {
        fetchSeason(route.query?.page || oldPage)
    }
)


</script>

<template>
    <div class="flex flex-col max-w-7xl">
        <div v-if="animeData && pageData">
            <PaginationControl :total-page="pageData.last_visible_page" />
            <section>
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 justify-items-center">
                    <AnimeCard v-for="anime in animeData" :title="anime.title"
                        :img-url="anime.images.webp.large_image_url" :title-english="anime.title_english"
                        :id="anime.mal_id" :type="anime.type" />
                </div>
            </section>
            <PaginationControl :total-page="pageData.last_visible_page" />
        </div>
    </div>
</template>