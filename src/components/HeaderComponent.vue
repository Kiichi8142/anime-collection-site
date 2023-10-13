<script setup>
import { RouterLink, useRouter } from 'vue-router';

const router = useRouter()

</script>

<template>
    <header class="bg-neutral-900">
        <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 border-b border-neutral-800">
            <div class="flex">
                <img src="@/assets/logo.svg" alt="" class="object-resize h-12">
            </div>
            <div class="hidden lg:flex gap-x-10 text-neutral-50">
                <RouterLink to="/" class="text-base font-semibold leading-6">Home</RouterLink>
                <RouterLink to="/search" class="text-base font-semibold leading-6">Search</RouterLink>
                <RouterLink to="/profile" class="text-base font-semibold leading-6">Profile</RouterLink>
            </div>
            <div class="flex lg:hidden gap-x-10 text-neutral-50">
                <RouterLink to="#" class="text-base font-semibold leading-6">More</RouterLink>
            </div>
        </nav>
    </header>
</template>