<script setup>
import { RouterView } from 'vue-router'
import Header from './components/Header.vue';
</script>

<template>
  <Suspense>
    <Header />
  </Suspense>
  <Suspense>
    <RouterView />
  </Suspense>
</template>
