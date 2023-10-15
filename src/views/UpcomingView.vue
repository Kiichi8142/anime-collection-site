<script setup>
import CurrentSeasonAnime from '../components/CurrentSeasonAnime.vue';
</script>

<template>
    <div class="max-w-7xl mx-auto text-neutral-50 p-6 lg:p-8">
        <h1 class="font-medium text-xl text-neutral-400">Upcoming Anime</h1>
        <CurrentSeasonAnime category="upcoming" />
    </div>
</template>