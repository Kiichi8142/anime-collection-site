<script setup>
import ScrollableAnimeCard from '../components/ScrollableAnimeCard.vue';

import { useRouter } from 'vue-router'
import { onMounted, ref, defineAsyncComponent } from 'vue';
import { useAnimeStore } from '@/stores/animeStore.js'
import { storeToRefs } from 'pinia';

const LoadingDot = defineAsyncComponent(
  () => import('../components/LoadingDot.vue')
)

const router = useRouter()
const animeStore = useAnimeStore()
const { fetchSeason, fetchRecommendation } = animeStore
const { season, recommendations } = storeToRefs(animeStore)

const currentSeason = ref()

onMounted(async () => {
  await fetchSeason()
  await fetchRecommendation()
  currentSeason.value = season.value.current.filter((anime) => anime.year == 2024) // show for current year
})

function goToCategory(type) {
  router.push({ name: 'category', params: { type: type } })
}

const year = new Date().getFullYear();
const seasonTxt = animeStore.getCurrentSeason()

</script>

<template>
  <div class="max-w-7xl mx-auto p-6 lg:p-8 text-neutral-50">
    <p class="font-semibold text-2xl">Category</p>
    <div class="grid md:grid-cols-2 gap-8 mt-4 max-w-7xl">
      <div @click="router.push({ name: 'seasonal', params: { year: year, season: seasonTxt } })"
        class="relative group hover:cursor-pointer h-28 md:h-100 row-span-1 md:row-span-2 transition-all duration-200 bg-black rounded-md">
        <p class="absolute text-neutral-100 font-medium bottom-10 right-5 text-xl z-10 shadow-md">Seasonal</p>
        <p class="absolute text-neutral-300 font-medium bottom-5 right-5 text-sm z-10 shadow-md">View category</p>
        <img src="@/assets/img/mangaCat.jpg"
          class="rounded-md object-cover w-full h-full shadow-inner opacity-80 group-hover:opacity-50 transition-all duration-200">
      </div>
      <div @click="goToCategory('anime')"
        class="relative group hover:cursor-pointer h-28 md:h-48 transition-all duration-200 bg-black rounded-md">
        <p class="absolute text-neutral-100 font-medium bottom-10 right-5 text-xl z-10 shadow-md">TV Series</p>
        <p class="absolute text-neutral-300 font-medium bottom-5 right-5 text-sm z-10 shadow-md">View category</p>
        <img src="@/assets/img/animeCat.jpg"
          class="rounded-md object-cover object-right-top w-full h-full shadow-inner opacity-80 group-hover:opacity-50 transition-all duration-200">
      </div>
      <div @click="router.push({ name: 'upcoming' })"
        class="relative group hover:cursor-pointer h-28 md:h-48 transition-all duration-200 bg-black rounded-md">
        <p class="absolute text-neutral-100 font-medium bottom-10 right-5 text-xl z-10 shadow-md">Upcoming</p>
        <p class="absolute text-neutral-300 font-medium bottom-5 right-5 text-sm z-10 shadow-md">View category</p>
        <img src="@/assets/img/charaCat.jpg"
          class="rounded-md object-cover object-top w-full h-full shadow-inner opacity-80 group-hover:opacity-50 transition-all duration-200">
      </div>
    </div>

    <section>
      <div class="space-x-0.5">
        <p class="font-semibold text-2xl mt-4">TV Series</p>
        <p class="text-neutral-400 text-base font-medium">Current season</p>
      </div>
      <Transition mode="out-in">
        <ScrollableAnimeCard v-if="currentSeason" :data="currentSeason" />
        <div v-else>
          <LoadingDot></LoadingDot>
        </div>
      </Transition>
    </section>
  </div>
</template>

<style>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  @apply transition-all ease-in-out duration-300
}

.v-enter-from,
.v-leave-to {
  @apply opacity-0
}
</style>
