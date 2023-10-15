<script setup>
import axios from 'axios';
import { ref, watch } from 'vue'
import AnimeCard from '../components/AnimeCard.vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const searchValue = ref(route.query.q)

const searchDetails = ref()

const baseURL = 'https://api.jikan.moe/v4/'
const loadDetail = async () => {
  const res = await axios.get('anime', { baseURL: baseURL, params: { q: searchValue.value, sfw: true } })
  searchDetails.value = res.data.data
}

loadDetail()

watch(searchValue, (newValue) => {
  router.push({ query: { q: newValue } })
  loadDetail()
})

</script>

<template>
  <div class="max-w-7xl mx-auto p-4 lg:p-8">
    <h1 class="font-medium text-4xl text-gray-100">Search</h1>
    <input placeholder="Search anime. . ." v-model.lazy="searchValue"
      class="w-full mt-4 text-gray-100 p-2 bg-neutral-800 rounded-lg placeholder-neutral-600" type="text">
    <div class="grid grid-cols-4 gap-8 mt-8">
      <div v-for="(anime, index) in searchDetails" :key="index">
        <AnimeCard :img-url="anime.images.webp.large_image_url" :title="anime.title" :title-english="anime.title_english"
          :id="anime.mal_id" :type="anime.type" />
      </div>
    </div>
  </div>
</template>
