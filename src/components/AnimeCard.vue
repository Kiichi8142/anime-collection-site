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
    <div class="rounded-md w-[14rem] text-center cursor-pointer">
        <div class="space-y-1">
            <div>
                <div v-if="!imageLoaded" class="bg-neutral-800 h-[21rem] w-full rounded-md animate-pulse"></div>
                <img @load="onImageLoaded" @click="gotoDetail()" :src="props.imgUrl"
                    class="object-center object-cover hover:opacity-80 w-full rounded-md mx-auto transition-all duration-300">
            </div>
            <div class="space-y-0.5">
                <p class="text-neutral-50 truncate">{{ props.title }}</p>
                <p class="text-neutral-400 truncate">{{ props.titleEnglish }}</p>
            </div>
        </div>
    </div>
</template>