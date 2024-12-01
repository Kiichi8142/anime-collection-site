<script setup>
import { useUserStore } from '../../stores/userStore';

const userStore = useUserStore()

function deleteData() {
    userStore.resetUserData()
    window.location.reload()
}

</script>

<template>
    <div class="flex flex-col mx-auto rounded-md justify-start space-y-2">
        <div class="border-neutral-800 border p-4 rounded-md space-y-2">
            <p class="text-neutral-50 font-medium text-2xl">Account Settings</p>
            <form @submit.prevent class="grid grid-cols-1 lg:grid-cols-2 gap-y-2 lg:gap-y-4 lg:mx-auto">
                <label for="username" class="text-neutral-400">Display name</label>
                <input v-model="userStore.userInfo.displayName" type="text"
                    class="py-1 rounded-md bg-neutral-800 text-neutral-400 px-2">
                <label for="interest" class="text-neutral-400">Profile Picture</label>
                <input v-model="userStore.userInfo.profilePicture" type="text"
                    class="py-1 rounded-md bg-neutral-800 text-neutral-400 px-2 placeholder-neutral-600" placeholder="Enter image url" maxlength="255">
                <label for="interest" class="text-neutral-400">Pronouns</label>
                <input v-model="userStore.userInfo.pronouns" type="text"
                    class="py-1 rounded-md bg-neutral-800 text-neutral-400 px-2" maxlength="10">
                <!-- <label for="interest" class="text-neutral-400">Interest</label>
                <input v-model="userStore.userInfo.interest" type="text"
                    class="py-1 rounded-md bg-neutral-800 text-neutral-400 px-2" maxlength="20"> -->
                <label for="bio" class="text-neutral-400">Bio</label>
                <textarea v-model="userStore.userInfo.bio" maxlength="50" name="bio" id="bio" cols="30" rows="4"
                    class="py-1 rounded-md bg-neutral-800 text-neutral-400 px-2"></textarea>
            </form>
        </div>
        <div class="border-neutral-800 border p-4 rounded-md">
            <p class="text-neutral-50 font-medium text-2xl">Data controls</p>
            <div class="grid grid-cols-1 md:grid-cols-2 items-center">
                <p class="text-neutral-400">User Data</p>
                <button @click="deleteData"
                    class="bg-red-600 mt-2 w-auto md:mt-0 md:w-fit md:place-self-end hover:bg-red-800 font-medium text-sm py-2 px-4 rounded-md text-neutral-100">Reset Data</button>
            </div>
        </div>
    </div>
</template>