<script setup>
import SeasonalAnime from '../components/SeasonalAnime.vue';
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const year = ref(route.params.year)
const season = ref(route.params.season)

</script>

<template>
    <div class="max-w-7xl mx-auto text-neutral-50 p-6 lg:p-8">
        <h1 class="font-medium text-xl text-neutral-400">Current Season</h1>
        <SeasonalAnime category="now" />
    </div>
</template>