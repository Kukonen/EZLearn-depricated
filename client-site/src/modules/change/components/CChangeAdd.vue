<script setup lang="ts">
import AddImage from '../../../assets/add.svg';

const {add} = defineProps<{
    add: () => void
}>()
</script>

<template>
    <button @click="add">
        Добавить
        <img :src="AddImage" alt="добавить">
    </button>
</template>

<style scoped>

</style>