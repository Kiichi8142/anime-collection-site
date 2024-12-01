<script setup>
import { StarIcon } from '@heroicons/vue/24/solid';

const formStatus = defineModel('formStatus')
const formProgress = defineModel('formProgress')
const emit = defineEmits(['hideModal', 'updateBookmark'])
const formScore = defineModel('formScore')

const statusList = [
    { text: 'Interested', value: 'Interested' },
    { text: 'Completed', value: 'Completed' },
    { text: 'Dropped', value: 'Dropped' },
    { text: 'Watching', value: 'Watching' },
    { text: 'Plan to watch', value: 'Plan to watch' }
]

const setScore = (score) => {
    formScore.value = score
}

</script>

<template>
    <div class="w-full px-8 py-4">
        <form class="form-wrapper">
            <div class="input-group">
                <p class="input-label">Name</p>
                <label for="name">Anime Name</label>
            </div>
            <div class="input-group">
                <label for="status" class="input-label">Status</label>
                <select class="input" v-model="formStatus">
                    <option v-for="status in statusList" :key="status.text" :value="status.value">
                        {{ status.text }}
                    </option>
                </select>
            </div>
            <div class="input-group">
                <label for="progress" class="input-label">Episodes</label>
                <input min="0" class="input" type="number" name="progress" id="progress" v-model="formProgress">
            </div>
            <div class="input-group">
                <label for="score" class="input-label">Your Score</label>
                <div class="flex input-none-enterable">
                    <StarIcon @click="setScore(n)" v-for="n in 10" class="size-6 cursor-pointer" :class="{ 'text-yellow-400': formScore >= n }" >
                        {{ n }}
                    </StarIcon>
                </div>
            </div>
            <div class="form-button-wrapper">
                <button @click="$emit('hideModal')" type="button" class="button hover:bg-neutral-600">Cancel</button>
                <button @click="$emit('updateBookmark')" type="button"
                    class="button bg-green-600 hover:bg-green-700">Update</button>
            </div>
        </form>
    </div>
</template>

<style>
.button {
    @apply px-2 py-1 rounded-md transition-all
}

.form-wrapper {
    @apply gap-2 divide-neutral-400/50 divide-y
}

.form-button-wrapper {
    @apply flex justify-end space-x-2 py-4
}

.input-group {
    @apply space-x-4 grid grid-cols-3 py-4 items-center
}

.input-label {
    @apply font-medium
}

.input {
    @apply px-2 py-1 bg-neutral-600 rounded-md col-span-2 font-normal w-32
}

.input-none-enterable {
    @apply col-span-2
}
</style>