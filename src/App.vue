<script setup>
import { RouterView } from 'vue-router'
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import { useRoute } from 'vue-router';

const route = useRoute()
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <RouterView :key="route.fullPath" />
    <Footer />
  </div>
</template>
