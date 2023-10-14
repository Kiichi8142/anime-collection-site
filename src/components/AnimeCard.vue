<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()

const props = defineProps([
    'imgUrl',
    'title',
    'titleEnglish',
    'id',
    'type'
])

function gotoDetail() {
    router.push({ name: 'anime', params: { id: props.id } })
}
</script>

<template>
    <div @click="gotoDetail()" class="rounded-md text-center">
        <div class="h-64 lg:h-96 mx-auto hover:bg-neutral-800 rounded-md hover:cursor-pointer">
            <img :src="props.imgUrl" class="h-full w-full object-cover rounded-md object-center hover:opacity-80">
        </div>
        <p class="truncate font-medium text-neutral-100">{{ props.title }}</p>
        <p class="truncate text-neutral-400">{{ props.titleEnglish }}</p>
    </div>
</template>