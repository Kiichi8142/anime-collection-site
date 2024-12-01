<script setup>
import { defineAsyncComponent, onMounted, ref, watch, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { animeSearch } from '../api/anime-api';
import LoadingDot from '../components/LoadingDot.vue';
import Body7xl from '../components/Body7xl.vue';

const AnimeGridCard = defineAsyncComponent(
  () => import('../components/AnimeCardGrid.vue')
);

const PaginationControl = defineAsyncComponent(
  () => import('../components/PaginationControl.vue')
);

const route = useRoute();
const router = useRouter();

const types = [
  { text: 'TV', value: 'tv' },
  { text: 'Movie', value: 'movie' },
  { text: 'OVA', value: 'ova' },
  { text: 'Special', value: 'special' },
  { text: 'ONA', value: 'ona' },
]

const selectedType = ref(types[0].value)

const ratings = [
  { text: 'None', value: '' },
  { text: 'G - All Ages', value: 'g' },
  { text: 'PG - Children', value: 'pg' },
  { text: 'PG-13 - Teens 13 or older', value: 'pg13' },
  { text: 'R - 17+ (violence & profanity)', value: 'r17' },
  { text: 'R+ - Mild Nudity', value: 'r' },
  { text: 'Rx - Hentai', value: 'rx' },
]

const selectedRating = ref(ratings[0].value)

const searchQuery = ref(route.query.query)
const searchDetails = ref()
const pagesData = ref([])
const isLoading = ref(true)
const error = ref(null)

const nextPage = async () => {
  if (pagesData.value.has_next_page) {
    router.push({ path: '/search', query: { ...route.query, 'page': pagesData.value.current_page + 1 } })
  }
}

const prevPage = async () => {
  if (pagesData) {
    router.push({ path: '/search', query: { ...route.query, 'page': pagesData.value.current_page - 1 } })
  }
}

const fetchSearch = async (q, page) => {
  isLoading.value = true
  error.value = null

  try {
    const searchResponse = await animeSearch(q, selectedType.value, route.query?.page || 1, selectedRating.value)
    searchDetails.value = searchResponse.data.data
    pagesData.value = searchResponse.data.pagination
  } catch (err) {
    console.log("Error fetching search result:", err)
    error.value = err
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  selectedRating.value = route.query?.rating || ratings[0].value
  selectedType.value = route.query?.type || types[0].value
  await fetchSearch(route.query.query)
})

watch(selectedRating, () => {
  router.push({ path: '/search', query: { ...route.query, 'rating': selectedRating.value } })
})

watch(selectedType, () => {
  router.push({ path: '/search', query: { ...route.query, 'type': selectedType.value } })
})

watchEffect(async () => {
  router.push({ path: '/search', query: { ...route.query, 'query': searchQuery.value } })
})
</script>

<template>
  <Body7xl>
    <div class="flex flex-col space-y-2">
      <h1 class="font-medium text-4xl text-gray-100">Search</h1>
      <input placeholder="Type in keywords..." v-model.lazy="searchQuery"
        class="w-full mt-4 text-gray-100 p-2 bg-neutral-800 rounded-lg placeholder-neutral-600" type="text">
      <div class="flex space-x-2">
        <div class="space-x-1">
          <label for="type" class="text-neutral-50 font-medium">Type</label>
          <select name="type" class="bg-neutral-800 p-1 rounded-md font-sm w-fit text-neutral-50"
            v-model="selectedType">
            <option v-for="(type, typeIndex) in types" :key="typeIndex" :value="type.value">
              {{ type.text }}
            </option>
          </select>
        </div>
        <div class="space-x-1">
          <label for="type" class="text-neutral-50 font-medium">Rating Filter</label>
          <select name="type" class="bg-neutral-800 p-1 rounded-md font-sm w-fit text-neutral-50"
            v-model="selectedRating">
            <option v-for="(rate, rateIndex) in ratings" :key="rateIndex" :value="rate.value">
              {{ rate.text }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <transition mode="out-in">
      <LoadingDot v-if="isLoading" />
      <div v-else>
        <PaginationControl :total-page="pagesData.last_visible_page" :has-next-page="pagesData.has_next_page"
          :current-page="pagesData.current_page" @next-page="nextPage" @prev-page="prevPage" />
        <AnimeGridCard :anime-data="searchDetails" :page-data="pagesData" />
        <PaginationControl :total-page="pagesData.last_visible_page" :has-next-page="pagesData.has_next_page"
          :current-page="pagesData.current_page" @next-page="nextPage" @prev-page="prevPage" />
      </div>
    </transition>
  </Body7xl>
</template>

<style>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  @apply transition-all ease-in-out duration-100
}

.v-enter-from,
.v-leave-to {
  @apply opacity-0
}
</style>
