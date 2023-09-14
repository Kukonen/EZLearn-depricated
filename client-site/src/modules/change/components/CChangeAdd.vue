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
        <svg width="400" height="400" viewBox="0 0 400 400" stroke="black" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="200" cy="200" r="145" stroke-width="10"/>
            <line x1="205" y1="100" x2="205" y2="300" stroke-width="10"/>
            <line x1="100" y1="195" x2="300" y2="195" stroke-width="10"/>
        </svg>
<!--        <img :src="AddImage" alt="добавить">-->
    </c-button>
</template>

<style scoped>

</style>