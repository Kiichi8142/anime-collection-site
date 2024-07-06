<script setup>
import { RouterView } from 'vue-router'
import Header from './components/Header.vue';
import { useRoute } from 'vue-router';

const route = useRoute()
</script>

<template>
  <div>
    <Header />
    <RouterView :key="route.fullPath" />
  </div>
</template>
