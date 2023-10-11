<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/userStore';

const userStore = useUserStore()

const accountDetail = ref({
    displayName: '',
    interest: '',
    bio: ''
})

accountDetail.value = {
    ...userStore.information
}

function updateInformation() {
    userStore.information = {
        ...accountDetail.value
    }
}

</script>

<template>
    <div class="max-w-7xl mx-auto p-6 lg:p-8">
        <div class="flex mx-auto bg-neutral-800 rounded-md p-6 flex-col justify-start lg:flex-row">
            <p class="text-neutral-50 font-medium text-2xl">Account Settings</p>
            <form @submit.prevent class="grid grid-cols-1 lg:grid-cols-2 gap-y-2 lg:gap-y-4 lg:mx-auto">
                <label for="username" class="text-neutral-400">display name</label>
                <input v-model="accountDetail.displayName" type="text"
                    class="py-1 rounded-md bg-neutral-700 text-neutral-400 px-2">
                <label for="interest" class="text-neutral-400">Interest</label>
                <input v-model="accountDetail.interest" type="text"
                    class="py-1 rounded-md bg-neutral-700 text-neutral-400 px-2">
                <label for="bio" class="text-neutral-400">Bio</label>
                <textarea v-model="accountDetail.bio" maxlength="50" name="bio" id="bio" cols="30" rows="4"
                    class="py-1 rounded-md bg-neutral-700 text-neutral-400 px-2"></textarea>
                <button @click="updateInformation()"
                    class="py-1 px-4 bg-neutral-400 hover:bg-neutral-500 rounded-md w-28 font-medium text-neutral-900">Save</button>
            </form>
        </div>
    </div>
</template>