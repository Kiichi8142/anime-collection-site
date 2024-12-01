<script setup>
import { computed } from 'vue'
import { useUserStore } from "../../stores/userStore";

const userStore = useUserStore()
const hasItems = computed(() => userStore?.watchlist.length || 0)
const sortedList = computed(() => {
    const animeCpy = userStore.watchlist
    if (animeCpy) {
        animeCpy.sort((a, b) => b.score - a.score);
    }
    return animeCpy
})
</script>

<template>
    <div class="text-neutral-50 rounded-md">
        <div v-if="hasItems" class="flex flex-col gap-4 mt-2">
            <div v-for="(item, key) in sortedList" :key="key"
                class="flex items-center p-4 h-auto md:h-20 border border-neutral-700 rounded-md">
                <img :src="item.data.images.webp.image_url" alt=""
                    class="self-start w-12 md:w-auto md:h-full shrink-0 object-cover">
                <div class="flex flex-col md:flex-row w-full justify-between items-center ml-4">
                    <p class="font-medium truncate">{{ item.data.title }}</p>
                    <div class="flex gap-x-1 md:gap-x-2 items-end">
                        <p class="text-neutral-100">You score this </p>
                        <p class="text-2xl text-yellow-400">{{ item.score }}</p>
                        <p class="text-neutral-100">points</p>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <p class="text-neutral-600 font-semibold text-lg">You don't have any bookmark.</p>
        </div>
    </div>
</template>