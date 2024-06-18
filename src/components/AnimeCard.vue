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
    <div @click="gotoDetail()" class="rounded-md w-72 text-center cursor-pointer">
        <div class="space-y-1">
            <img :src="props.imgUrl" class="object-center object-cover h-96 w-72 rounded-md mx-auto">
            <div class="space-y-0.5">
                <p class="text-neutral-50 truncate">{{ props.title }}</p>
                <p class="text-neutral-400 truncate">{{ props.titleEnglish }}</p>
            </div>
        </div>
    </div>
</template>