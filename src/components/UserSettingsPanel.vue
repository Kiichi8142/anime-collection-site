<script setup>
import { useUserStore } from '../stores/userStore';

const userStore = useUserStore()

</script>

<template>
    <div class="flex mx-auto rounded-md p-6 flex-col justify-start lg:flex-row">
        <p class="text-neutral-50 font-medium text-2xl">Account Settings</p>
        <form @submit.prevent class="grid grid-cols-1 lg:grid-cols-2 gap-y-2 lg:gap-y-4 lg:mx-auto">
            <label for="username" class="text-neutral-400">Display name</label>
            <input v-model="userStore.information.displayName" type="text"
                class="py-1 rounded-md bg-neutral-700 text-neutral-400 px-2">
            <label for="interest" class="text-neutral-400">Pronouns</label>
            <input v-model="userStore.information.pronouns" type="text"
                class="py-1 rounded-md bg-neutral-700 text-neutral-400 px-2" maxlength="10">
            <label for="interest" class="text-neutral-400">Interest</label>
            <input v-model="userStore.information.interest" type="text"
                class="py-1 rounded-md bg-neutral-700 text-neutral-400 px-2" maxlength="20">
            <label for="bio" class="text-neutral-400">Bio</label>
            <textarea v-model="userStore.information.bio" maxlength="50" name="bio" id="bio" cols="30" rows="4"
                class="py-1 rounded-md bg-neutral-700 text-neutral-400 px-2"></textarea>
        </form>
    </div>
</template>