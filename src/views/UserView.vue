<script setup>
import { useUserStore } from "../stores/userStore";
import Body7xl from "../components/Body7xl.vue";

const userStore = useUserStore();

const tabs = [
    { name: 'Info', route: 'user' },
    { name: 'Bookmark', route: 'user-bookmark' },
    { name: 'Ranking', route: 'user-ranking' },
    { name: 'Settings', route: 'user-settings' },
]

</script>

<template>
    <Body7xl>
        <div class="space-y-4">
            <div class="flex space-x-4">
                <img class="size-20 rounded-full object-contain my-auto" :src="userStore.userInfo.profilePicture || '@/assets/img/placeholder_avatar.png'" alt="User Avatar" />
                <div class="flex flex-col justify-center">
                    <h2 class="text-xl font-bold tracking-tight text-neutral-100 sm:text-4xl">
                        {{ userStore.userInfo.displayName }}
                    </h2>
                    <p v-if="userStore.userInfo.pronouns" class="text-lg text-neutral-400">{{ userStore.userInfo.pronouns }}</p>
                    <p v-else class="text-lg leading-8 text-neutral-400">
                        Update or view your statistics here.
                    </p>
                </div>
            </div>

            <div class="space-y-8">
                <div>
                    <router-link v-for="(tab, key) in tabs" :key="key" class="tab-button" :to="{ name: tab.route }">
                        {{ tab.name }}
                    </router-link>
                </div>
                <div>
                    <router-view />
                </div>
            </div>
        </div>
    </Body7xl>
</template>

<style>
.tab-button {
    @apply py-2 px-4 text-neutral-400 border-b-2 border-neutral-700 hover:text-green-500 transition-all;
}

.tab-button.router-link-exact-active {
    @apply border-green-500 border-b-2 text-neutral-50
}
</style>
