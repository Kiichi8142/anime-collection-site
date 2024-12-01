<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter()
const imageLoaded = ref(false)

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

const onImageLoaded = () => {
    imageLoaded.value = true
}
</script>

<template>
    <div class="rounded-md text-center cursor-pointer w-[14rem]">
        <div class="space-y-1">
            <div class="h-[20rem]">
                <div v-if="!imageLoaded" class="bg-neutral-800 h-full rounded-md animate-pulse"></div>
                <img @load="onImageLoaded" @click="gotoDetail()" :src="props.imgUrl"
                    class="hover:opacity-80 w-full h-full object-cover mx-auto object-center rounded-md transition-all duration-300">
            </div>
            <div class="space-y-0.5">
                <p class="text-neutral-50 truncate">{{ props.title }}</p>
                <p class="text-neutral-400 truncate">{{ props.titleEnglish }}</p>
            </div>
        </div>
    </div>
</template>