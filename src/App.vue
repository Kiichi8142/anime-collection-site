<script setup>
import { RouterView } from 'vue-router'
import HeaderComponent from './components/HeaderComponent.vue'
import { useFirebaseAuth } from 'vuefire';

const auth = useFirebaseAuth()

console.log(auth)

</script>

<template>
  <Suspense>
    <HeaderComponent />
  </Suspense>
  <Suspense>
    <RouterView />
  </Suspense>
</template>
