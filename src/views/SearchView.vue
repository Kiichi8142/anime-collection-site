<script setup>
import axios from 'axios';
import { ref, watch } from 'vue'
import AnimeCard from '../components/AnimeCard.vue'
import { useRoute, useRouter } from 'vue-router'
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import { ChevronUpDownIcon } from '@heroicons/vue/20/solid'

const people = [
  { name: 'TV' },
  { name: 'Movie' },
  { name: 'OVA' },
  { name: 'Special' },
  { name: 'ONA' },
  { name: 'Music' },
]

const selectedPerson = ref(people[0])

const route = useRoute()
const router = useRouter()

const searchValue = ref(route.query.q)
const searchDetails = ref()

const baseURL = 'https://api.jikan.moe/v4/'

const loadDetail = async () => {
  const res = await axios.get('anime', { baseURL: baseURL, params: { q: searchValue.value, sfw: true, type: selectedPerson.value.name } })
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
    <div class="flex">
      <h1 class="font-medium text-4xl text-gray-100">Search</h1>
      <Listbox v-model="selectedPerson">
        <div class="relative ml-4 mt-1">
          <ListboxButton
            class="relative w-full cursor-default rounded-lg bg-neutral-800 text-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span class="block truncate">{{ selectedPerson.name }}</span>
            <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </ListboxButton>

          <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
            leave-to-class="opacity-0">
            <ListboxOptions
              class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-neutral-700 py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              <ListboxOption v-slot="{ active, selected }" v-for="person in people" :key="person.name" :value="person"
                as="template">
                <li :class="[
                  active ? 'bg-green-600 text-neutral-50' : 'text-neutral-400',
                  'relative cursor-default select-none py-1 pl-4',
                ]">
                  <span :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block truncate',
                  ]">{{ person.name }}</span>
                </li>
              </ListboxOption>
            </ListboxOptions>
          </transition>
        </div>
      </Listbox>
    </div>
    <input placeholder="Search anime. . ." v-model.lazy="searchValue"
      class="w-full mt-4 text-gray-100 p-2 bg-neutral-800 rounded-lg placeholder-neutral-600" type="text">
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 mt-8">
      <div v-for="(anime, index) in searchDetails" :key="index">
        <AnimeCard :img-url="anime.images.webp.large_image_url" :title="anime.title" :title-english="anime.title_english"
          :id="anime.mal_id" :type="anime.type" />
      </div>
    </div>
  </div>
</template>
