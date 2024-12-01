<script setup>
import { XMarkIcon } from '@heroicons/vue/24/solid';
const props = defineProps(['title'])
const emit = defineEmits(['close'])
</script>

<template>
    <div class="fixed inset-0 min-h-full bg-neutral-950/50 backdrop-blur-sm overflow-y-auto overflow-x-hidden transition flex items-center">
        <div class="flex flex-col justify-center mx-auto bg-neutral-800 rounded-lg min-w-[32rem] divide-neutral-600 divide-y">
            <div class="flex justify-between items-center space-x-10 p-4">
                <p class="text-gray-50 text-xl">{{ title }}</p>
                <XMarkIcon @click="$emit('close')" 
                    class="size-5 hover:bg-red-600 text-white rounded-full cursor-pointer" />
            </div>
            <slot></slot>
        </div>
        
    </div>
</template>