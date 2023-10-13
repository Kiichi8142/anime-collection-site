<script setup>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import UserBookmarkPanel from '../components/UserBookmarkPanel.vue';
import { HeartIcon, PencilIcon } from '@heroicons/vue/20/solid'
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
                <div
                    class="grid grid-cols-4 gap-x-4 w-full text-neutral-600 font-medium border border-neutral-800 rounded-md p-6 md:p-8">
                    <p>Favorite</p>
                    <p class="text-neutral-400">{{ userStore.favCount }}</p>
                    <p>Interested</p>
                    <p class="text-neutral-400">{{ userStore.getStatusCount('Interested') }}</p>
                    <p>Watching</p>
                    <p class="text-neutral-400">{{ userStore.getStatusCount('Watching') }}</p>
                    <p>Completed</p>
                    <p class="text-neutral-400">{{ userStore.getStatusCount('Completed') }}</p>
                    <p>Dropped</p>
                    <p class="text-neutral-400">{{ userStore.getStatusCount('Dropped') }}</p>
                    <p>On Hold</p>
                    <p class="text-neutral-400">{{ userStore.getStatusCount('On Hold') }}</p>
                </div>
            </div>

            <TabGroup>
                <TabList class="mt-8 flex">
                    <Tab class="p-4 text-neutral-50 border-b border-neutral-900 hover:border-green-500">Bookmark</Tab>
                    <Tab class="p-4 text-neutral-50 border-b border-neutral-900 hover:border-green-500">Ranking</Tab>
                    <Tab class="p-4 text-neutral-50 border-b border-neutral-900 hover:border-green-500">Tab 3</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <UserBookmarkPanel />
                    </TabPanel>
                    <TabPanel>Content 2</TabPanel>
                    <TabPanel>Content 3</TabPanel>
                </TabPanels>
            </TabGroup>
        </div>
    </div>
</template>