<script setup>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';
import UserBookmarkPanel from '../components/UserBookmarkPanel.vue';
import UserRankingPanel from '../components/UserRankingPanel.vue';
import UserFavoritePanel from '../components/UserFavoritePanel.vue';
import UserStatsPanel from '../components/UserStatsPanel.vue';
import StatusListBox from '../components/StatusListBox.vue';
import { HeartIcon, PencilIcon } from '@heroicons/vue/20/solid';
import { ref } from 'vue';
import { useUserStore } from '../stores/userStore';

const userStore = useUserStore()

const accountDetail = ref({
    displayName: '',
    interest: '',
    bio: ''
})

accountDetail.value = {
    ...userStore.information
}

const categories = ref({
    Bookmark: [],
    Ranking: [],
    Favorite: [],
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
        <div>
            <p class="text-neutral-50 font-medium text-4xl text-center md:text-start">Welcome to your profile page!</p>
            <p class="text-neutral-600 font-medium text-base text-center md:text-start">You can edit your profile
                information or view your
                statistics here.</p>
            <div class="mt-8 gap-2 flex rounded-md">
                <div class="flex flex-col w-fit items-center rounded-md p-6 md:p-8">
                    <img class="inline-block h-24 w-24 rounded-full ring-4 ring-neutral-700"
                        src="@/assets/img/placeholder_avatar.png" alt="">
                    <p class="font-medium text-2xl text-neutral-50">{{ accountDetail.displayName }}</p>
                    <div v-if="accountDetail.interest" class="py-1 flex items-center">
                        <HeartIcon class="h-5 w-5 text-neutral-700" />
                        <p class="text-neutral-700 font-medium ml-1">{{ accountDetail.interest }}</p>
                    </div>
                    <div v-if="accountDetail.bio" class="mt-4">
                        <p class="font-medium text-base text-neutral-600">Bio</p>
                        <p class="font-base text-base text-neutral-400">{{ accountDetail.bio }}</p>
                    </div>
                    <RouterLink to="/account/edit"
                        class="w-full mt-4 justify-center flex items-center gap-x-1 bg-neutral-700 rounded-md py-2 px-3 text-neutral-100 font-semibold text-base">
                        <PencilIcon class="h-5 w-5 text-neutral-100" />
                        Edit
                    </RouterLink>
                </div>
                <UserStatsPanel />
            </div>

            <TabGroup>
                <TabList class="mt-8 flex w-full border-b border-neutral-800">
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
                        <UserFavoritePanel />
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </div>
    </div>

    <Dialog :open="isOpen" @close="setIsOpen">
        <div class="fixed inset-0 overflow-y-auto">
            <div class="flex min-h-full items-center justify-center p-4 text-center">
                <DialogPanel class="bg-neutral-800 rounded-md text-neutral-100 flex items-start shadow-xl">
                    <img class="object-fill h-full w-24"
                        :src="userStore.getAnimeDataNonComputed(selectedAnime).data.images.webp.large_image_url" alt="">
                    <div class="p-4 flex flex-col items-start">
                        <DialogTitle class="font-medium text-xl">Edit Bookmark</DialogTitle>
                        <form action="" class="mt-4 grid grid-cols-2 gap-4">
                            <label class="font-medium">Status</label>
                            <StatusListBox :id="selectedAnime" />
                            <label class="font-medium">Score</label>
                            <input v-model="userStore.getAnimeDataNonComputed(selectedAnime).score"
                                class="rounded-md bg-neutral-700 font-medium text-neutral-200 px-2 py-1" type="number"
                                min="0" max="10">
                            <label class="font-medium">Episodes</label>
                            <input v-model="userStore.getAnimeDataNonComputed(selectedAnime).progress"
                                class="rounded-md bg-neutral-700 font-medium text-neutral-200 px-2 py-1" type="number"
                                min="0" :max="userStore.getAnimeDataNonComputed(selectedAnime).episodes">
                        </form>
                        <div class="flex self-end gap-x-2">
                            <button
                                class="py-2 px-4 text-green-600 hover:text-white hover:bg-neutral-700 font-medium rounded-md mt-4"
                                @click="modalDeleteAnime(selectedAnime)">Delete</button>
                            <button class="py-2 px-4 bg-green-600 hover:bg-green-700 font-medium rounded-md mt-4"
                                @click="setIsOpen(false)">Save</button>
                        </div>
                    </div>
                </DialogPanel>
            </div>
        </div>
    </Dialog>
</template>