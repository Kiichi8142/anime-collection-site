<script setup>
import ScrollableAnimeCard from '../components/ScrollableAnimeCard.vue';

import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue';
import { useAnimeStore } from '@/stores/animeStore.js'
import { storeToRefs } from 'pinia';

const router = useRouter()
const animeStore = useAnimeStore()
const { fetchSeason } = animeStore
const { season } = storeToRefs(animeStore)

const currentSeason = ref()

onMounted(async () => {
  await fetchSeason()
  currentSeason.value = season.value.current.filter((anime) => anime.year == 2024) // show for current year
})

function goToCategory(type) {
  router.push({ name: 'category', params: { type: type } })
}

function getCurrentSeason() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Month starting from 0, so add 1 to get the actual month.

  if (currentMonth >= 3 && currentMonth <= 5) {
    return 'spring';
  } else if (currentMonth >= 6 && currentMonth <= 8) {
    return 'summer';
  } else if (currentMonth >= 9 && currentMonth <= 11) {
    return 'fall';
  } else {
    return 'winter';
  }
}
</script>

<template>
  <div class="max-w-7xl mx-auto p-6 lg:p-8 text-neutral-50">
    <p class="font-semibold text-2xl">Collections</p>
    <div class="grid md:grid-cols-2 gap-8 mt-4 max-w-7xl">
      <div @click="router.push({ name: 'seasonal', params: { year: '2023', season: getCurrentSeason() } })"
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
      <ScrollableAnimeCard :data="currentSeason" />
    </section>
  </div>
</template>
