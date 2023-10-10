<script setup>
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
    <div class="max-w-7xl mx-auto p-6 lg:p-8">
        <div v-if="!user">
            <p class="text-neutral-700 font-medium text-2xl text-center">You're not signed in yet. Please sign-in first so
                you can view
                your profile. :3</p>
        </div>
        <div v-else>
            <p class="text-neutral-50 font-medium text-4xl">Welcome to your profile page!</p>
            <p class="text-neutral-600 font-medium text-base">You can edit your profile information or view your
                statistics</p>
            <div class="mt-8 flex justify-between bg-neutral-800 p-8 rounded-md">
                <div class="flex">
                    <img class="inline-block h-32 w-32 rounded-full ring-2 ring-neutral-700"
                        src="@/assets/img/placeholder_avatar.png" alt="">
                    <div class="p-4 self-start">
                        <p class="font-medium text-2xl text-neutral-50">{{ accountDetail.displayName }}</p>
                    </div>
                </div>
                <div>
                    <p class="font-medium text-base text-neutral-400">{{ accountDetail.bio }}</p>
                </div>
                <div class="flex">
                    <div v-if="user.uid === $route.params.uid">
                        <RouterLink to="/account/edit" class="self-start text-neutral-600 font-medium text-xl">Edit
                        </RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>