<script setup>
const props = defineProps([
    'imgUrl',
    'title',
    'titleEnglish'
])

</script>

<template>
    <div class="rounded-md w-64 shrink-0 text-center">
        <div class="h-64 lg:h-96 w-64 mx-auto hover:bg-neutral-800 rounded-md hover:cursor-pointer">
            <img :src="props.imgUrl" class="h-full w-full object-cover rounded-md object-center hover:opacity-80">
        </div>
        <p class="truncate font-medium text-neutral-100">{{ props.title }}</p>
        <p class="truncate text-neutral-400">{{ props.titleEnglish }}</p>
    </div>
</template>