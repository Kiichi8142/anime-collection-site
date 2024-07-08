<script setup>
import { computed, defineAsyncComponent } from 'vue';
import PaginationControl from './PaginationControl.vue';
import { RouterLink, useRoute } from 'vue-router';

const AnimeCard = defineAsyncComponent(
    () => import('./AnimeCard.vue')
)
const props = defineProps(['animeData', 'pageData'])
const route = useRoute()

const outOfPage = computed(() => props.pageData.current_page > props.pageData.last_visible_page)

</script>

<template>
    <div class="flex flex-col max-w-7xl">
        <div v-if="animeData">
            <div v-if="outOfPage" class="flex flex-col items-center justify-center py-20 space-y-2">
                <p class="text-2xl text-neutral-200">404 Page not found</p>
                <RouterLink
                    class="text-xl text-neutral-50 bg-green-600 px-2 py-1 rounded-md hover:opacity-80 transition-all"
                    :to="{ name: route.name, params: route.params, query: { ...route.query, page: 1 } }">Go back to
                    first page.
                </RouterLink>
            </div>
            <div v-else>
                <section>
                    <div
                        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 justify-items-center">
                        <AnimeCard v-for="anime in animeData" :title="anime.title"
                            :img-url="anime.images.webp.large_image_url" :title-english="anime.title_english"
                            :id="anime.mal_id" :type="anime.type" />
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>