<script setup>
import { HeartIcon, PencilIcon } from '@heroicons/vue/20/solid'
import { doc, getDoc } from 'firebase/firestore'
import { useFirestore, useCurrentUser, useFirebaseAuth } from 'vuefire'
import { onAuthStateChanged } from 'firebase/auth'
import { useRoute } from 'vue-router'
import { ref } from 'vue'

const route = useRoute()
const auth = useFirebaseAuth()
const db = useFirestore()
const user = useCurrentUser()

const accountDetail = ref({
    displayName: '',
    interest: '',
    bio: ''
})

onAuthStateChanged(auth, async (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        if (uid === route.params.uid) {
            const userDetail = await getDoc(doc(db, 'users', uid))
            accountDetail.value = {
                ...userDetail.data()
            }
        } else {
            const userDetail = await getDoc(doc(db, 'users', route.params.uid))
            accountDetail.value = {
                ...userDetail.data()
            }
        }
        console.log(accountDetail.value)
    } else {
        // User is signed out
        accountDetail.value = {
            displayName: '',
            interest: '',
            bio: ''
        }
    }
});

</script>

<template>
    <div class="max-w-7xl mx-auto p-4 lg:p-8">
        <div v-if="!user">
            <p class="text-neutral-700 font-medium text-2xl text-center">You're not signed in yet. Please sign-in first so
                you can view
                your profile. :3</p>
        </div>
        <div v-else>
            <p class="text-neutral-50 font-medium text-4xl text-center md:text-start">Welcome to your profile page!</p>
            <p class="text-neutral-600 font-medium text-base text-center md:text-start">You can edit your profile
                information or view your
                statistics</p>
            <div class="mt-8 gap-2 flex flex-col md:flex-row justify-between bg-neutral-800 p-6 md:p-8 rounded-md">
                <div class="flex">
                    <img class="inline-block h-24 w-24 rounded-full ring-4 ring-neutral-700"
                        src="@/assets/img/placeholder_avatar.png" alt="">
                    <div class="p-4 self-start">
                        <p class="font-medium text-2xl text-neutral-50">{{ accountDetail.displayName }}</p>
                        <div v-if="accountDetail.interest" class="py-1 flex items-center">
                            <HeartIcon class="h-5 w-5 text-neutral-700" />
                            <p class="text-neutral-700 font-medium ml-1">{{ accountDetail.interest }}</p>
                        </div>
                    </div>
                </div>
                <div class="md:w-96 mt-2 md:mt-0">
                    <p class="font-medium text-base text-neutral-400">Bio</p>
                    <p class="font-base text-base text-neutral-400">{{ accountDetail.bio }}</p>
                </div>
                <div>
                    <div v-if="user.uid === $route.params.uid" class="flex">
                        <RouterLink to="/account/edit"
                            class="self-start flex items-center gap-x-1 bg-neutral-700 rounded-md py-2 px-3 text-neutral-100 font-semibold text-base">
                            <PencilIcon class="h-5 w-5 text-neutral-100" />
                            Edit
                        </RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>