<script setup>
import { HeartIcon, PencilIcon, UsersIcon } from '@heroicons/vue/20/solid'
import { ref } from 'vue'
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

console.log(userStore)

</script>

<template>
    <div class="max-w-7xl mx-auto p-4 lg:p-8">
        <div>
            <p class="text-neutral-50 font-medium text-4xl text-center md:text-start">Welcome to your profile page!</p>
            <p class="text-neutral-600 font-medium text-base text-center md:text-start">You can edit your profile
                information or view your
                statistics</p>
            <div class="mt-8 gap-2 flex flex-col md:flex-row justify-between bg-neutral-800 p-6 md:p-8 rounded-md">
                <div class="flex">
                    <img class="inline-block h-24 w-24 rounded-full ring-4 ring-neutral-700"
                        src="@/assets/img/placeholder_avatar.png" alt="">
                    <div class="p-4 self-start">
                        <p class="font-medium text-2xl text-neutral-50">{{ accountDetail.displayName }}</p>
                        <div v-if="accountDetail.interest" class="py-1 flex items-center">
                            <HeartIcon class="h-5 w-5 text-neutral-700" />
                            <p class="text-neutral-700 font-medium ml-1">{{ accountDetail.interest }}</p>
                        </div>
                    </div>
                </div>
                <div class="md:w-96 mt-2 md:mt-0">
                    <p class="font-medium text-base text-neutral-400">Bio</p>
                    <p class="font-base text-base text-neutral-400">{{ accountDetail.bio }}</p>
                </div>
                <div class="grid grid-cols-2 gap-x-4 text-neutral-600 font-medium">
                    <p>Favorite</p>
                    <p class="text-neutral-400">{{ userStore.favCount }}</p>
                    <p>Watching</p>
                    <p class="text-neutral-400">{{ userStore.getStatusCount('Watching') }}</p>
                    <p>Completed</p>
                    <p class="text-neutral-400">{{ userStore.getStatusCount('Completed') }}</p>
                    <p>Dropped</p>
                    <p class="text-neutral-400">{{ userStore.getStatusCount('Dropped') }}</p>
                </div>
                <div>
                    <RouterLink to="/account/edit"
                        class="self-start flex items-center gap-x-1 bg-neutral-700 rounded-md py-2 px-3 text-neutral-100 font-semibold text-base">
                        <PencilIcon class="h-5 w-5 text-neutral-100" />
                        Edit
                    </RouterLink>
                </div>
            </div>
            <div class="text-neutral-50">
                <p class="font-medium text-2xl">Bookmark List</p>
                <div v-if="userStore.watchlist.length">
                    <div v-for="(item, key) in userStore.watchlist" :key="key">
                        <p>{{ item.status }}</p>
                        <p>{{ item.data.title }}</p>
                        <button @click="userStore.deleteWatchList(item.id)">Delete</button>
                        <div class="flex gap-x-4 flex-wrap">
                            <button class="bg-neutral-800 rounded-md p-2" @click="userStore.toggleEpStatus(item.id, index)"
                                v-for="(episode, index) in item.episodes" :key="index">
                                {{ index }} {{ episode }}
                            </button>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <p class="text-neutral-600 font-semibold text-lg">You don't have any bookmark. Search for anime and try
                        to bookmark something. :3</p>
                </div>
            </div>
        </div>
    </div>
</template>