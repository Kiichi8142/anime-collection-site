<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { useCurrentUser, useFirebaseAuth } from 'vuefire';
import { signOut } from 'firebase/auth';

const router = useRouter()
const user = useCurrentUser()

const auth = useFirebaseAuth();
async function signOutOfFirebase() {
    signOut(auth).then(() => {
        // Sign-out successful.
        router.push('/')
    }).catch((error) => {
        // An error happened.
    });
}

</script>

<template>
    <header class="bg-neutral-900">
        <nav class="mx-auto flex max-w-7xl items-center justify-between p-6">
            <div class="flex">
                <img src="@/assets/logo.svg" alt="" class="object-resize h-12">
            </div>
            <div class="hidden lg:flex gap-x-10 text-neutral-50">
                <RouterLink to="/" class="text-base font-semibold leading-6">Home</RouterLink>
                <RouterLink to="/about" class="text-base font-semibold leading-6">About</RouterLink>
                <RouterLink v-if="user?.email" :to="{ name: 'users', params: { uid: user.uid } }"
                    class="text-base font-semibold leading-6">Profile</RouterLink>
            </div>
            <div class="hidden lg:flex gap-x-2">
                <div v-if="user?.email" class="flex gap-x-2">
                    <button @click="signOutOfFirebase()" class="text-base text-neutral-50 font-semibold leading-6">Sign
                        out</button>
                </div>
                <RouterLink v-else to="/sign-in" class="text-base text-neutral-50 font-semibold leading-6">Sign
                    in</RouterLink>
            </div>
            <div class="flex lg:hidden gap-x-10 text-neutral-50">
                <RouterLink to="#" class="text-base font-semibold leading-6">More</RouterLink>
            </div>
        </nav>
    </header>
</template>