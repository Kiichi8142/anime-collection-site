<script setup>
import CurrentSeasonAnime from '../components/CurrentSeasonAnime.vue';
import SeasonalAnime from '../components/SeasonalAnime.vue'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const year = ref(route.params.year)
const season = ref(route.params.season)

import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
} from '@headlessui/vue'
import { ChevronUpDownIcon } from '@heroicons/vue/20/solid'

const seasonList = [
    { name: 'winter' },
    { name: 'fall' },
    { name: 'summer' },
    { name: 'spring' },
]

const selectedSeason = ref(seasonList.find(item => item.name === season.value))

const yearList = [];

for (let year = 2024; year >= 1984; year--) {
    yearList.push({ name: year.toString() });
}

const selectedYear = ref(yearList.find(item => item.name === year.value))

watch(selectedSeason, () => {
    console.log(selectedSeason)
    router.replace({ name: 'seasonal', params: { year: selectedYear.value.name, season: selectedSeason.value.name } })
})

watch(selectedYear, () => {
    console.log(selectedYear)
    router.replace({ name: 'seasonal', params: { year: selectedYear.value.name, season: selectedSeason.value.name } })
})

</script>

<template>
    <div class="max-w-7xl mx-auto text-neutral-50 p-6 lg:p-8">

        <div v-if="!year && !season">
            <h1 class="font-medium text-xl text-neutral-400">Current Season</h1>
            <CurrentSeasonAnime category="now" />
        </div>
        <div v-if="year && selectedSeason">
            <div class="flex items-center">
                <h1 class="font-medium text-xl text-neutral-400">{{ year }} {{ season.toUpperCase() }}</h1>
                <Listbox v-model="selectedSeason">
                    <div class="relative ml-4 mt-1">
                        <ListboxButton
                            class="relative w-full cursor-default rounded-lg bg-neutral-800 text-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                            <span class="block truncate">{{ selectedSeason.name }}</span>
                            <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </span>
                        </ListboxButton>

                        <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
                            leave-to-class="opacity-0">
                            <ListboxOptions
                                class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-neutral-700 py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                <ListboxOption v-slot="{ active, selected }" v-for="person in seasonList" :key="person.name"
                                    :value="person" as="template">
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

                <Listbox v-model="selectedYear">
                    <div class="relative ml-4 mt-1">
                        <ListboxButton
                            class="relative w-full cursor-default rounded-lg bg-neutral-800 text-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                            <span class="block truncate">{{ selectedYear.name }}</span>
                            <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </span>
                        </ListboxButton>

                        <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
                            leave-to-class="opacity-0">
                            <ListboxOptions
                                class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-neutral-700 py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                <ListboxOption v-slot="{ active, selected }" v-for="person in yearList" :key="person.name"
                                    :value="person" as="template">
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

            <SeasonalAnime :year="selectedYear.name" :season="selectedSeason.name" />
        </div>
    </div>
</template>