<script setup lang="ts">

import CTransition from "./common/c-transition.vue";
</script>

<template>
    <router-view v-slot="{ Component, route }">
        <c-transition>
            <component :is="Component" :key="route.path" />
        </c-transition>
    </router-view>
</template>

<style scoped>

</style>