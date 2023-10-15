<script setup>
import { useUserStore } from '../stores/userStore';
const userStore = useUserStore()
</script>

<template>
    <div
        class="grid grid-cols-2 md:grid-cols-4 gap-x-4 text-neutral-600 font-medium border border-neutral-800 rounded-md p-6 md:p-8">
        <p>Episode watched</p>
        <p class="text-neutral-400 text-xl">{{ userStore.getEpisodeWatched() }}</p>
        <p>Interested</p>
        <p class="text-neutral-400 text-xl">{{ userStore.getStatusCount('Interested') }}</p>
        <p>Watching</p>
        <p class="text-neutral-400 text-xl">{{ userStore.getStatusCount('Watching') }}</p>
        <p>Completed</p>
        <p class="text-neutral-400 text-xl">{{ userStore.getStatusCount('Completed') }}</p>
        <p>Dropped</p>
        <p class="text-neutral-400 text-xl">{{ userStore.getStatusCount('Dropped') }}</p>
        <p>On Hold</p>
        <p class="text-neutral-400 text-xl">{{ userStore.getStatusCount('On Hold') }}</p>
    </div>
</template>