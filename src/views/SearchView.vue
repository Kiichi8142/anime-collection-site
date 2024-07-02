<script setup>
import { defineAsyncComponent, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { animeSearch } from '../api/anime-api';

const AnimeGridCard = defineAsyncComponent(
  () => import('../components/AnimeCardGrid.vue')
);

const types = [
  { text: 'TV' },
  { text: 'Movie' },
  { text: 'OVA' },
  { text: 'Special' },
  { text: 'ONA' },
  { text: 'Music' },
]

const selectedType = ref('TV')

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
  const searchResponse = await animeSearch(searchValue.value, selectedType.value, page)
  searchDetails.value = searchResponse.data.data
  pagesData.value = searchResponse.data.pagination
}

watchEffect(async () => {
  await fetchSearch(route.query?.page || 1);
  router.push({ query: { q: searchValue.value, page: pagesData.value?.current_page } })
})

</script>

<template>
  <div class="max-w-7xl mx-auto p-4 lg:p-8">
    <div class="flex space-x-2">
      <h1 class="font-medium text-4xl text-gray-100">Search</h1>
      <select class="bg-neutral-800 p-1 rounded-md font-sm w-fit text-neutral-50" v-model="selectedType">
        <option v-for="(type, typeIndex) in types" :key="typeIndex" :value="type.text">
          {{ type.text }}
        </option>
      </select>
    </div>
    <input placeholder="Type here to search" v-model.lazy="searchValue"
      class="w-full mt-4 text-gray-100 p-2 bg-neutral-800 rounded-lg placeholder-neutral-600" type="text">
    <div v-if="pagesData && searchDetails">
      <AnimeGridCard :anime-data="searchDetails" :page-data="pagesData" @next-page="nextPage" @prev-page="prevPage" />
    </div>
  </div>
</template>
