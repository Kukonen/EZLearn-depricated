<script setup lang="ts">
import AddImage from '../../../assets/add.svg';
import CButton from "../../../components/CButton.vue";

const {add} = defineProps<{
    add: () => void
}>()
</script>

<template>
    <c-button type="common" @click="add">
        Добавить
        <img :src="AddImage" alt="добавить">
    </c-button>
</template>

<style scoped>

</style>