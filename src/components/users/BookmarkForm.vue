<script setup>
const formStatus = defineModel('formStatus')
const formProgress = defineModel('formProgress')
const emit = defineEmits(['hideModal', 'updateBookmark'])

const statusList = [
    { text: 'Interested', value: 'Interested' },
    { text: 'Completed', value: 'Completed' },
    { text: 'Dropped', value: 'Dropped' },
    { text: 'Watching', value: 'Watching' },
    { text: 'Plan to watch', value: 'Plan to watch' }
]

</script>

<template>
    <div class="w-full">
        <form class="form-wrapper">
            <div class="input-group">
                <label for="status" class="input-label">Status</label>
                <select class="input" v-model="formStatus">
                    <option v-for="status in statusList" :key="status.text" :value="status.value">
                        {{ status.text }}
                    </option>
                </select>
            </div>
            <div class="input-group">
                <label for="progress" class="input-label">Progress</label>
                <input class="input" type="number" name="progress" id="progress" v-model="formProgress">
            </div>
            <div class="form-button-wrapper">
                <button @click="$emit('hideModal')" type="button" class="button hover:bg-neutral-600">Cancel</button>
                <button @click="$emit('updateBookmark')" type="button"
                    class="button bg-green-600 hover:bg-green-700">Update</button>
            </div>
        </form>
    </div>
</template>