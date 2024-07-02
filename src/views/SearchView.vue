<script setup>
import { defineAsyncComponent, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { animeSearch } from '../api/anime-api';

const AnimeGridCard = defineAsyncComponent(
  () => import('../components/AnimeCardGrid.vue')
);

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

const route = useRoute()
const router = useRouter()

const searchValue = ref(route.query.q)
const searchDetails = ref()
const pagesData = ref([])

const nextPage = async () => {
  if (pagesData.value.has_next_page) {
    await fetchSearch(pagesData.value.current_page + 1)
  }
}

const prevPage = async () => {
  if (pagesData) {
    await fetchSearch(pagesData.value.current_page - 1)
  }
}

const fetchSearch = async (page) => {
  const searchResponse = await animeSearch(searchValue.value, selectedType.value, page, selectedRating.value)
  searchDetails.value = searchResponse.data.data
  pagesData.value = searchResponse.data.pagination
}

watchEffect(async () => {
  await fetchSearch(route.query?.page || 1);
  router.push({ query: { q: searchValue.value, type: selectedType.value, page: pagesData.value?.current_page, rating: selectedRating.value } })
})

</script>

<template>
  <div class="max-w-7xl mx-auto p-4 lg:p-8">
    <div class="flex flex-col space-y-2">
      <h1 class="font-medium text-4xl text-gray-100">Search</h1>
      <input placeholder="Type in keywords..." v-model.lazy="searchValue"
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
    <div v-if="pagesData && searchDetails">
      <AnimeGridCard :anime-data="searchDetails" :page-data="pagesData" @next-page="nextPage" @prev-page="prevPage" />
    </div>
  </div>
</template>
