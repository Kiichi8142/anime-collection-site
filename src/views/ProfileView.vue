<script setup>
import { useCurrentUser } from 'vuefire'

const user = useCurrentUser()
console.log(user)

</script>

<template>
    <div class="max-w-7xl mx-auto p-6 lg:p-8">
        <div v-if="user">
            <p class="text-neutral-50 font-medium text-4xl">Welcome to your profile page!</p>
            <p class="text-neutral-600 font-medium text-base">You can edit your profile information or view your
                statistics</p>
            <div class="mt-8 flex justify-between bg-neutral-800 p-8 rounded-md">
                <div class="flex">
                    <img class="inline-block h-32 w-32 rounded-full ring-2 ring-neutral-700"
                        src="@/assets/img/placeholder_avatar.png" alt="">
                    <div class="p-4 self-start">
                        <p>{{ user.displayName }}</p>
                        <p class="font-medium text-2xl text-neutral-50">{{ user.email }}</p>
                    </div>
                </div>
                <div class="flex">
                    <p>Favorite</p>
                </div>
                <div class="flex">
                    <button class="self-start text-neutral-600 font-medium text-xl">Edit</button>
                </div>
            </div>
        </div>
        <div v-else>
            <p class="text-neutral-700 font-medium text-2xl text-center">You're not signed in yet. Please sign-in first so
                you can view
                your profile. :3</p>
        </div>
    </div>
</template>