<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()
const props = defineProps(['totalPage'])

const page = ref()

const nextPage = () => {
    page.value = page.value < props.totalPage ? page.value + 1 : props.totalPage
    router.push({ query: { page: page.value } })
}

const prevPage = () => {
    page.value = page.value > 1 ? page.value - 1 : 1
    router.push({ query: { page: page.value } })
}

watch(
    () => route.query?.page,
    (newPage, oldPage) => {
        page.value = parseInt(newPage)
    }
)

onMounted(() => {
    page.value = parseInt(route.query?.page)
    if (!page.value) {
        page.value = 1
        router.replace({ query: { page: page.value } })
    }
})

</script>

<template>
    <div class="flex space-x-8 mx-auto justify-center py-4">
        <button v-on:click="prevPage">Prev</button>
        <p>{{ page }} / {{ totalPage }}</p>
        <button v-on:click="nextPage">Next</button>
    </div>
</template>