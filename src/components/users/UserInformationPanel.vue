<script setup>
const props = defineProps(['userStats', 'userStore'])

</script>

<template>
    <div class="border border-neutral-800 rounded-md p-4 space-y-2">
        <p class="text-neutral-50 font-medium text-2xl">me!</p>
        <div class="grid grid-cols-1 text-neutral-600 font-medium">
            <p class="">{{ userStore.userInfo.bio }}</p>
        </div>
    </div>
</template>

<style>
</style>