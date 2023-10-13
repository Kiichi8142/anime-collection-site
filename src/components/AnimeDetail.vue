<script setup>
const props = defineProps(['detail'])
</script>

<template>
    <div class="flex flex-col w-full p-8 border border-neutral-800 rounded-md mt-8">
        <p class="text-xl font-base text-neutral-400">Details</p>
        <hr class="mt-4 mb-4 bg-neutral-800 border-0 h-px">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div class="grid grid-cols-1 md:grid-cols-4">
                <p class="font-medium text-neutral-100 text-base">Title</p>
                <div class="md:col-span-3 grid gap-2 text-neutral-400 h-fit">
                    <div class="grid grid-cols-2" v-for="(title, index) in props.detail.titles" :key="index">
                        <p class="">{{ title.type }}</p>
                        <p class="">{{ title.title }}</p>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-1 items-start gap-2">
                <div class="grid grid-cols-2 md:grid-cols-4 items-end">
                    <p class="font-medium text-neutral-100 text-base">Source</p>
                    <p class=" text-neutral-400">{{ props.detail.source }}</p>
                </div>
                <div class="grid grid-cols-2 md:grid-cols-4 items-end">
                    <p class="font-medium text-neutral-100 text-base">Season</p>
                    <p class=" text-neutral-400">{{ props.detail.season }}</p>
                </div>
                <div class="grid grid-cols-2 md:grid-cols-4 items-end">
                    <p class="font-medium text-neutral-100 text-base">Episodes</p>
                    <p class=" text-neutral-400">{{ props.detail.episodes }}</p>
                </div>
                <div class="grid grid-cols-2 md:grid-cols-4 items-end">
                    <p class="font-medium text-neutral-100 text-base">Duration</p>
                    <p class=" text-neutral-400">{{ props.detail.duration }}</p>
                </div>
                <div class="grid grid-cols-2 md:grid-cols-4 items-end">
                    <p class="font-medium text-neutral-100 text-base">Type</p>
                    <p class=" text-neutral-400">{{ props.detail.type }}</p>
                </div>
                <div class="grid grid-cols-2 md:grid-cols-4 items-end">
                    <p class="font-medium text-neutral-100 text-base">Rating</p>
                    <p class="md:col-span-3 text-neutral-400">{{ props.detail.rating }}</p>
                </div>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-4">
                <p class="font-medium text-neutral-100 text-base">Producers</p>
                <div class="text-neutral-400 items-end">
                    <div v-for="(producer, index) in props.detail.producers" :key="index">
                        <p>{{ producer.name }}</p>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-4">
                <p class="font-medium text-neutral-100 text-base">Relations</p>
                <div class="col-span-3 grid gap-2 h-fit">
                    <div class="text-neutral-400 grid grid-cols-2" v-for="(relate, index) in props.detail.relations"
                        :key="index">
                        <p>{{ relate.relation }}</p>
                        <div class="">
                            <p v-for="(entry, index) in relate.entry" :key="index">{{ entry.name }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-4">
                <p class="font-medium text-neutral-100 text-base">Studios</p>
                <div class="text-neutral-400">
                    <div v-for="(studio, index) in props.detail.studios" :key="index">
                        <p class="col-span-1">{{ studio.name }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>