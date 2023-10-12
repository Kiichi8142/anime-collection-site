<script setup>
import { RouterView } from 'vue-router'
import headercomponent from './components/headercomponent.vue';
</script>

<template>
  <Suspense>
    <headercomponent />
  </Suspense>
  <Suspense>
    <RouterView />
  </Suspense>
</template>
