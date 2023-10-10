<script setup>
import { ref } from 'vue'
import { useFirebaseAuth, useFirestore } from 'vuefire';
import { useRouter } from 'vue-router'
import { doc, setDoc } from 'firebase/firestore'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios';

const db = useFirestore()
const router = useRouter()
const userInput = ref({
    email: '',
    password: ''
})

const userDetails = ref({
    displayName: '',
    interest: '',
    bio: '',
})

const errorMsg = ref('')

const auth = useFirebaseAuth();

async function createUser() {
    errorMsg.value = ''
    createUserWithEmailAndPassword(auth, userInput.value.email, userInput.value.password)
        .then(async (userCredential) => {
            // Signed up 
            const user = userCredential.user;
            if (!userDetails.value.displayName) {
                const res = await axios.get('https://api.jikan.moe/v4/random/characters')
                userDetails.value.displayName = res.data.data.name
            }
            await setDoc(doc(db, "users", user.uid), {
                ...userDetails.value
            });
            router.push({ name: 'users', params: { uid: user.uid } })
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            errorMsg.value = errorCode
            console.log(errorCode, errorMessage)
            // ..
        });
}

async function signInToFirebase() {
    errorMsg.value = ''
    signInWithEmailAndPassword(auth, userInput.value.email, userInput.value.password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            router.push({ name: 'users', params: { uid: user.uid } })
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            errorMsg.value = errorCode
            console.log(errorCode, errorMessage)
        });
}


</script>

<template>
    <div class="max-w-7xl mx-auto p-6 lg:p-8">
        <p class="mt-8 text-center font-medium text-3xl text-neutral-50">Sign-In</p>
        <form @submit.prevent class="grid-cols-1 grid max-w-lg mx-auto">
            <label for="email" class="text-neutral-50 font-medium text-xl">Email</label>
            <input id="email" v-model="userInput.email" type="text" required
                class="rounded-md py-1 px-2 bg-neutral-800 text-neutral-400">
            <label for="password" class="text-neutral-50 font-medium text-xl">Password</label>
            <input id="password" v-model="userInput.password" type="password" required
                class="rounded-md py-1 px-2 bg-neutral-800 text-neutral-400">
            <p class="font-medium text-red-600">{{ errorMsg }}</p>
            <div class="flex justify-end gap-x-2 mt-2">
                <button @click="createUser" class="py-2 px-4 font-medium text-neutral-200 rounded-md">Create
                    new user</button>
                <button @click="signInToFirebase" type="submit"
                    class="py-2 px-4 font-medium bg-neutral-600 text-neutral-200 rounded-md">Sign-in</button>
            </div>
        </form>
    </div>
</template>