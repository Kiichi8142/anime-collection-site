<script setup>
import { useFirebaseAuth, useFirestore, useCurrentUser } from 'vuefire'
import { doc, updateDoc, getDoc } from 'firebase/firestore'
import { updateProfile, onAuthStateChanged } from 'firebase/auth'
import { ref } from 'vue'

const db = useFirestore()
const auth = useFirebaseAuth()
const currentUser = useCurrentUser()

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
        const userDetail = await getDoc(doc(db, 'users', uid))
        accountDetail.value = {
            ...userDetail.data()
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

async function updateFirebaseProfile() {
    console.log(accountDetail.value.displayName)
    updateProfile(auth.currentUser, {
        displayName: accountDetail.value.displayName,
    }).then(() => {
        // Profile updated!
        // ...
    }).catch((error) => {
        // An error occurred
        console.log(error)
        // ...
    });

    if (accountDetail.value) {
        await updateDoc(doc(db, 'users', currentUser.value.uid), {
            ...accountDetail.value
        })
        console.log("Document updated!");
    }
}

</script>

<template>
    <div class="max-w-7xl mx-auto p-6 lg:p-8">
        <div v-if="currentUser" class="flex mx-auto bg-neutral-800 rounded-md p-6 flex-col justify-start lg:flex-row">
            <p class="text-neutral-50 font-medium text-2xl">Account Settings</p>
            <form @submit.prevent class="grid grid-cols-1 lg:grid-cols-2 gap-y-2 lg:gap-y-4 lg:mx-auto">
                <label for="username" class="text-neutral-400">display name</label>
                <input v-model="accountDetail.displayName" type="text"
                    class="py-1 rounded-md bg-neutral-700 text-neutral-400 px-2">
                <label for="interest" class="text-neutral-400">Interest</label>
                <input v-model="accountDetail.interest" type="text"
                    class="py-1 rounded-md bg-neutral-700 text-neutral-400 px-2">
                <label for="bio" class="text-neutral-400">Bio</label>
                <textarea v-model="accountDetail.bio" maxlength="255" name="bio" id="bio" cols="30" rows="4"
                    class="py-1 rounded-md bg-neutral-700 text-neutral-400 px-2"></textarea>
                <button @click="updateFirebaseProfile()"
                    class="py-1 px-4 bg-neutral-400 hover:bg-neutral-500 rounded-md w-28 font-medium text-neutral-900">Save</button>
            </form>
        </div>
        <div v-else>
            <p class="text-neutral-700 font-medium text-2xl text-center">You're not signed in yet.</p>
        </div>
    </div>
</template>