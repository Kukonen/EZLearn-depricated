<script setup lang="ts">

import CHeading from "../../../../components/CHeading.vue";
import {useStore} from "vuex";

const store = useStore();

const createFromCurrent = () => {
    store.dispatch('scheduleSettings/createFromCurrent')
}

const createEmpty = () => {
    store.dispatch('scheduleSettings/createEmpty')
}

</script>

<template>
    <c-heading type="MEDIUM">
        Создание нового шаблона
    </c-heading>
    <div>
        <button
            @click="createFromCurrent"
        >
            Загрузить Текущий
        </button>
        <button
            @click="createEmpty"
        >
            Создать Новый
        </button>
    </div>
</template>

<style scoped>

</style>