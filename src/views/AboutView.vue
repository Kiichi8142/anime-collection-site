<script setup>
import { useFirestore, useCollection } from 'vuefire'
import { collection, doc, deleteDoc } from "firebase/firestore";
import { useRouter } from 'vue-router'

const router = useRouter()

const db = useFirestore()
const cafeCollection = useCollection(collection(db, 'cafes'))

function editCafe(id) {
  router.push({ name: 'editcafe', params: { id: id } })
}

async function deleteCafe(id) {
  await deleteDoc(doc(db, "cafes", id))
}
</script>

<template>
  <div>
    <h1>About page</h1>
    <div class="flex flex-col">
      <div v-for="(item, key) in cafeCollection" v-bind:key="key">
        <p>{{ item.name }}</p>
        <p>{{ item.price }}</p>
        <button @click="editCafe(item.id)">Edit</button>
        <button @click="deleteCafe(item.id)">Delete</button>
      </div>
    </div>
  </div>
</template>
