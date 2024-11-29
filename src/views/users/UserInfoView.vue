<script setup>
import UserStatsPanel from '../../components/users/UserStatsPanel.vue';
import { useUserStore } from '../../stores/userStore.js';

const userStore = useUserStore()

</script>

<template>
    <div>
        <UserStatsPanel :user-store="userStore" />
    </div>
</template>