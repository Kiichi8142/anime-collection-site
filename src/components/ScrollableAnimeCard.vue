<script setup>
import { ref } from 'vue';
import AnimeCard from '../components/AnimeCard.vue';
import { useElementSize } from "@vueuse/core"

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid';

const props = defineProps(['data'])

const scrollable = ref(null)
const { width } = useElementSize(scrollable)

const GoLeft = () => {
    scrollable.value.scrollBy({ left: -width.value, behavior: "smooth" })
};

const GoRight = () => {
    scrollable.value.scrollBy({ left: width.value, behavior: "smooth" });
};
</script>

<template>
    <section class="group">
        <div class="relative">
            <div ref="scrollable" class="overflow-x-auto xl:overflow-hidden py-4 flex flex-nowrap space-x-8">
                <div class="" v-for="(anime, key) in data" :key="key">
                    <AnimeCard :title="anime.title" :img-url="anime.images.webp.large_image_url"
                        :title-english="anime.title_english" :id="anime.mal_id" :type="anime.type" />
                </div>
            </div>
            <button
                class="absolute left-0 xl:-left-12 top-1/2 transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 hover:bg-neutral-700 bg-neutral-800 rounded-full size-10"
                @click="GoLeft">
                <ChevronLeftIcon class="size-8 mx-auto" />
            </button>
            <button
                class="absolute right-0 xl:-right-12 top-1/2 transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 hover:bg-neutral-700 bg-neutral-800 rounded-full size-10"
                @click="GoRight">
                <ChevronRightIcon class="size-8 mx-auto" />
            </button>
        </div>
    </section>
</template>