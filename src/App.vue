<script setup>
import { RouterView } from 'vue-router'
import headercomponent from './components/HeaderComponent.vue';
</script>

<template>
  <Suspense>
    <headercomponent />
  </Suspense>
  <Suspense>
    <RouterView />
  </Suspense>
</template>
