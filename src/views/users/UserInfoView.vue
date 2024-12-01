<script setup>
import UserStatsPanel from '../../components/users/UserStatsPanel.vue';
import UserInformationPanel from '../../components/users/UserInformationPanel.vue';
import { useUserStore } from '../../stores/userStore.js';

const userStore = useUserStore()

</script>

<template>
    <div class="space-y-2">
        <UserInformationPanel :user-store="userStore" />
        <UserStatsPanel :user-store="userStore" />
    </div>
</template>