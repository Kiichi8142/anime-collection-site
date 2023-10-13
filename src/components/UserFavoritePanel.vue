<script setup>
import { useUserStore } from '../stores/userStore';
import StatusListBox from '../components/StatusListBox.vue'
const userStore = useUserStore()
</script>

<template>
    <div class="text-neutral-50 rounded-md p-4 md:p-6">
        <p class="font-medium text-2xl">Favorite</p>
        <div v-if="userStore.favList.length" class="flex flex-col gap-4 mt-2">
            <div v-for="(item, key) in userStore.watchlist" :key="key"
                class="flex items-center p-4 h-auto md:h-20 border border-neutral-700 rounded-md">
                <img :src="item.data.images.webp.image_url" alt=""
                    class="self-start w-24 md:w-auto md:h-full shrink-0 object-cover">
                <div class="grid grid-cols-1 md:grid-cols-4 items-center w-full gap-1 justify-center p-4">
                    <p class="font-medium truncate md:col-span-2">{{ item.data.title }}</p>
                    <StatusListBox :id="item.id" />
                    <div class="flex gap-x-2 items-center">
                        <p class="font-semibold text-2xl">{{ userStore.getProgress(item.id) }}</p>
                        <p class="text-neutral-400 font-medium">episode watched</p>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <p class="text-neutral-600 font-semibold text-lg">You don't have any favorite anime ._.</p>
        </div>
    </div>
</template>