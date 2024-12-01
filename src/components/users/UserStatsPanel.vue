<script setup>
const props = defineProps(['userStats', 'userStore'])

</script>

<template>
    <div class="border border-neutral-800 rounded-md p-4 space-y-2">
        <p class="text-neutral-50 font-medium text-2xl">Statistics</p>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-x-4 text-neutral-600 font-medium">
            <p>Episode watched</p>
            <p class="text-stats">{{ userStore.getEpisodeWatched() }}</p>
            <p>Interested</p>
            <p class="text-stats">{{ userStore.getStatusCount('Interested') }}</p>
            <p>Watching</p>
            <p class="text-stats">{{ userStore.getStatusCount('Watching') }}</p>
            <p>Completed</p>
            <p class="text-stats">{{ userStore.getStatusCount('Completed') }}</p>
            <p>Dropped</p>
            <p class="text-stats">{{ userStore.getStatusCount('Dropped') }}</p>
            <p>On Hold</p>
            <p class="text-stats">{{ userStore.getStatusCount('On Hold') }}</p>
        </div>
    </div>
</template>

<style>
.text-stats {
    @apply text-neutral-400 text-xl text-center
}
</style>