<script setup>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';
import UserBookmarkPanel from '../components/UserBookmarkPanel.vue';
import UserRankingPanel from '../components/UserRankingPanel.vue';
import UserFavoritePanel from '../components/UserFavoritePanel.vue';
import UserStatsPanel from '../components/UserStatsPanel.vue';
import UserSettingsPanel from '../components/UserSettingsPanel.vue'
import StatusListBox from '../components/StatusListBox.vue';
import { HeartIcon } from '@heroicons/vue/20/solid';
import { ref } from 'vue';
import { useUserStore } from '../stores/userStore';

const userStore = useUserStore()

const categories = ref({
    Bookmark: [],
    Ranking: [],
    Settings: [],
})

import {
    Dialog,
    DialogPanel,
    DialogTitle,
} from '@headlessui/vue'
const selectedAnime = ref(0)
const isOpen = ref(false)

function openModal(id) {
    selectedAnime.value = id
    isOpen.value = true
}

function modalDeleteAnime(id) {
    isOpen.value = false
    console.log("Delete anime")
    console.log(id)
    userStore.deleteWatchList(id)
}

function setIsOpen(value) {
    isOpen.value = value
}

</script>

<template>
    <div class="max-w-7xl mx-auto p-4 lg:p-8">
        <h2 class="text-3xl font-bold tracking-tight text-gray-100 sm:text-4xl">Your profile.</h2>
        <p class="text-lg leading-8 text-gray-400">Update or view Statistics here.</p>
        <div class="flex flex-col md:flex-row gap-6 p-2 md:p-4">
            <div class="flex gap-x-4">
                <img class="w-24 md:w-32 rounded-full object-contain" src="@/assets/img/placeholder_avatar.png" alt="">
                <div class="flex flex-col justify-start mt-4">
                    <p class="font-medium text-xl md:text-2xl text-neutral-50">{{ userStore.information.displayName }}</p>
                    <div v-if="userStore.information.pronouns" class="flex">
                        <p class="text-neutral-700 font-medium ml-1">{{ userStore.information.pronouns }}</p>
                    </div>
                    <div v-if="userStore.information.interest" class="flex items-center">
                        <HeartIcon class="h-5 w-5 text-neutral-700" />
                        <p class="text-neutral-700 font-medium ml-1">{{ userStore.information.interest }}</p>
                    </div>
                </div>
            </div>
            <div v-if="userStore.information.bio" class="flex flex-col mt-0 md:mt-4 rounded-md px-2 py-1">
                <p class="text-neutral-700">bio</p>
                <p class="text-neutral-600 font-medium">{{ userStore.information.bio }}</p>
            </div>
        </div>

        <UserStatsPanel class="mt-4" />

        <TabGroup>
            <TabList class="mt-8 flex flex-col md:flex-row w-full border-b border-neutral-800">
                <Tab v-for="category in  Object.keys(categories) " as="template" :key="category" v-slot="{ selected }">
                    <button
                        :class="['px-8 border-b border-neutral-800 py-2.5 text-sm font-medium leading-5 text-neutral-600', selected ? 'border-sky-600 text-sky-600' : 'hover:border-sky-600 hover:text-sky-600']">
                        {{ category }}
                    </button>
                </Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <UserBookmarkPanel @editbookmark="(n) => openModal(n)" />
                </TabPanel>
                <TabPanel>
                    <UserRankingPanel />
                </TabPanel>
                <TabPanel>
                    <UserSettingsPanel />
                </TabPanel>
            </TabPanels>
        </TabGroup>
    </div>

    <Dialog :open="isOpen" @close="setIsOpen">
        <div class="fixed inset-0 overflow-y-auto">
            <div class="flex min-h-full items-center justify-center p-4 text-center">
                <DialogPanel class="bg-neutral-800 rounded-md text-neutral-100 flex shadow-xl h-fit">
                    <div class="p-6 md:p-8 flex flex-col justify-between">
                        <DialogTitle class="font-medium text-xl">Update bookmark</DialogTitle>
                        <div class="mt-4 px-8 grid grid-cols-2 grid-rows-3 gap-4">
                            <label class="font-medium place-self-start">Status</label>
                            <StatusListBox :id="selectedAnime" />
                            <label class="font-medium place-self-start">Score</label>
                            <input v-model="userStore.getAnimeDataNonComputed(selectedAnime).score"
                                class="place-self-start rounded-md bg-neutral-700 font-medium text-neutral-200 px-2 py-1"
                                type="number" min="0" max="10">
                            <label class="font-medium place-self-start">Episodes</label>
                            <input v-model="userStore.getAnimeDataNonComputed(selectedAnime).progress"
                                class="place-self-start rounded-md bg-neutral-700 font-medium text-neutral-200 px-2 py-1"
                                type="number" min="0" :max="userStore.getAnimeDataNonComputed(selectedAnime).episodes">
                        </div>
                        <div class="flex self-end gap-x-2">
                            <button
                                class="py-2 px-4 transition-all text-neutral-400 hover:text-red-500 hover:bg-neutral-700 font-medium rounded-md mt-4"
                                @click="modalDeleteAnime(selectedAnime)">Remove</button>
                            <button
                                class="py-2 px-4 transition-all bg-green-600 hover:text-neutral-100 hover:bg-green-700 font-medium rounded-md mt-4"
                                @click="setIsOpen(false)">Close</button>
                        </div>
                    </div>
                </DialogPanel>
            </div>
        </div>
    </Dialog>
</template>