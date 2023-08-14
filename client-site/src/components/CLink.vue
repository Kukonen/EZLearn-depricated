<script setup lang="ts">
import {RouterLink} from "vue-router";

const props = defineProps<{
    path: string
}>();

</script>

<template>
    <router-link :to="path">
        <slot />
    </router-link>
</template>

<style scoped>

</style>