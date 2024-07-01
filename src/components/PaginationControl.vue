<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const props = defineProps({
    'totalPage': Number,
    'hasNextPage': Boolean,
    'currentPage': Number
})
const hasPrevPage = computed(() => props.currentPage > 1)

const nextPage = () => {
    if (props.hasNextPage) {
        router.push({ query: { page: props.currentPage + 1 } })
    }
}

const prevPage = () => {
    if (hasPrevPage) {
        router.push({ query: { page: props.currentPage - 1 } })
    }
}

</script>

<template>
    <div class="flex space-x-8 mx-auto justify-center py-4">
        <button v-on:click="prevPage" :disabled="!hasPrevPage">Prev</button>
        <p>{{ currentPage }} / {{ totalPage }}</p>
        <button v-on:click="nextPage" :disabled="!hasNextPage">Next</button>
    </div>
</template>