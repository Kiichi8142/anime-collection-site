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
    <div class="rounded-md w-72 text-center cursor-pointer">
        <div class="space-y-1">
            <img @click="gotoDetail()" :src="props.imgUrl"
                class="object-center object-cover hover:opacity-80 h-96 w-72 rounded-md mx-auto transition-all duration-300">
            <div class="space-y-0.5">
                <p class="text-neutral-50 truncate">{{ props.title }}</p>
                <p class="text-neutral-400 truncate">{{ props.titleEnglish }}</p>
            </div>
        </div>
    </div>
</template>