<script setup>
import { ref } from 'vue'
import { useFirebaseAuth } from 'vuefire';
import { useRouter } from 'vue-router'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const router = useRouter()
const userInput = ref({
    email: '',
    password: ''
})

const errorMsg = ref('')

const auth = useFirebaseAuth();

async function createUser() {
    errorMsg.value = ''
    createUserWithEmailAndPassword(auth, userInput.value.email, userInput.value.password)
        .then((userCredential) => {
            // Signed up 
            //const user = userCredential.user;
            router.push('/')
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
            //const user = userCredential.user;
            router.push('/')
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
            <input v-model="userInput.email" type="text" required
                class="rounded-md py-1 px-2 bg-neutral-800 text-neutral-400">
            <label for="password" class="text-neutral-50 font-medium text-xl">Password</label>
            <input v-model="userInput.password" type="password" required
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