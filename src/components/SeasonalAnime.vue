<script setup>
import AnimeCard from './AnimeCard.vue';
const emits = defineEmits(['loadNextPage'])
const props = defineProps(['animelist', 'has_next_page'])
</script>

<template>
    <h1>test</h1>
    <div v-if="props.animelist" class="flex flex-col">
        <p class="text-2xl font-medium mt-8">TV Series</p>
        <hr class="mt-4 mb-4 bg-neutral-800 border-0 h-px">
        <div class="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 place-content-center max-w-7xl">
            <div v-for="(anime, key) in props.animelist" v-bind:key="key">
                <AnimeCard :title="anime.title" :img-url="anime.images.webp.large_image_url"
                    :title-english="anime.title_english" :id="anime.mal_id" :type="anime.type" />
            </div>
        </div>
        <button @click="emits('loadNextPage')" v-if="props.has_next_page"
            class="px-4 py-2 mt-4 bg-green-600 hover:bg-green-700 text-neutral-100 rounded-md w-fit mx-auto font-medium">Show
            More</button>
    </div>
</template>