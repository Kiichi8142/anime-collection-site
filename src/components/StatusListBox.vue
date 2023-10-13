<script setup>
import {
    Listbox,
    ListboxLabel,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
} from '@headlessui/vue'
import { CheckIcon, ChevronDownIcon } from '@heroicons/vue/20/solid'
import { useUserStore } from '../stores/userStore';
import { storeToRefs } from 'pinia';

const props = defineProps(['id', 'type'])
const userStore = useUserStore()
const user = storeToRefs(userStore)
const anime = user.watchlist.value.find((item) => item.id === props.id);

const statusClass = [
    "bg-yellow-600",
    "bg-green-500",
    "bg-blue-500",
    "bg-gray-200",
    "bg-gray-600",
]

const status = [
    "Interested",
    "Watching",
    "Completed",
    "On Hold",
    "Dropped",
];

</script>

<template>
    <Listbox v-model="anime.status">
        <div class="relative">
            <ListboxButton
                class="relative w-fit cursor-default hover:bg-neutral-700 rounded-md text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                <div class="flex items-center gap-1">
                    <div class="block rounded-full h-4 w-4" :class="statusClass[status.indexOf(anime.status)]" />
                    <span class="block truncate text-lg">{{ anime.status }}</span>
                    <ChevronDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
            </ListboxButton>

            <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
                leave-to-class="opacity-0">
                <ListboxOptions
                    class="absolute z-10 mt-1 max-h-60 overflow-auto rounded-md bg-neutral-700 py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    <ListboxOption v-slot="{ active, selected }" v-for="person in status" :key="person" :value="person"
                        as="template">
                        <li :class="[
                            active ? 'bg-neutral-600 text-green-500' : 'text-neutral-400',
                            'relative cursor-default select-none py-2 pl-10 pr-4',
                        ]">
                            <span :class="[
                                selected ? 'font-medium' : 'font-normal',
                                'block truncate',
                            ]">{{ person }}</span>
                            <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3 text-green-600">
                                <CheckIcon class="h-5 w-5" aria-hidden="true" />
                            </span>
                        </li>
                    </ListboxOption>
                </ListboxOptions>
            </transition>
        </div>
    </Listbox>
</template>
  