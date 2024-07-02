<script setup>
import { computed } from 'vue';

const props = defineProps({
    'totalPage': Number,
    'hasNextPage': Boolean,
    'currentPage': Number
})
const emit = defineEmits(['nextPage', 'prevPage'])

const hasPrevPage = computed(() => props.currentPage > 1)

const nextPage = () => {
    if (props.hasNextPage) {
        emit('nextPage')
    }
}

const prevPage = () => {
    if (hasPrevPage) {
        emit('prevPage')
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