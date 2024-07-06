<script setup>
import Bookmark from "../components/users/UserBookmarkPanel.vue";
import Ranking from "../components/users/UserRankingPanel.vue";
import { ref } from "vue";
import { useUserStore } from "../stores/userStore";

const userStore = useUserStore();

const currentTab = ref("Bookmark");
const tabs = {
    Bookmark,
    Ranking
};
</script>

<template>
    <div class="max-w-7xl mx-auto p-4 lg:p-8">
        <div class="flex space-x-4">
            <img class="w-24 rounded-full object-contain" src="@/assets/img/placeholder_avatar.png" alt="" />
            <div class="flex flex-col justify-center">
                <h2 class="text-3xl font-bold tracking-tight text-neutral-100 sm:text-4xl">
                    {{ userStore.userInfo.displayName }}
                </h2>
                <p class="text-lg leading-8 text-neutral-400">
                    Update or view your statistics here.
                </p>
            </div>
        </div>

        <div>
            <button v-for="(_, tab) in tabs" :key="tab" :class="['tab-button', { active: currentTab === tab }]"
                @click="currentTab = tab">
                {{ tab }}
            </button>
            <component :is="tabs[currentTab]" :user-store="userStore"></component>
        </div>
    </div>
</template>

<style>
.tab-button {
    @apply py-2 px-4 text-neutral-50 border-b-2 border-neutral-900 hover:text-green-500 transition-all;
}

.tab-button.active {
    @apply border-green-500 border-b-2;
}
</style>
