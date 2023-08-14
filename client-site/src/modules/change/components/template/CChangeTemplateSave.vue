<script setup lang="ts">

import CHeading from "../../../../components/CHeading.vue";
import {useStore} from "vuex";

const store = useStore();

const saveInCurrent = () => {
    store.dispatch('scheduleSettings/saveInCurrent');
}

const shareWithCommunity = () => {

}

</script>

<template>
    <c-heading type="MEDIUM">
        Загрузка Шаблона
    </c-heading>
    <div>
        <button @click="saveInCurrent">
            Сделать Шаблон Текущим Рассписанием
        </button>
        <button @click="shareWithCommunity">
            Поделиться с Сообществом
        </button>
    </div>
</template>

<style scoped>

</style>