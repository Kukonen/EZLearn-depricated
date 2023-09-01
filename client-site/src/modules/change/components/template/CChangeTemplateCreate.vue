<script setup lang="ts">

import CHeading from "../../../../components/CHeading.vue";
import {useStore} from "vuex";
import CButton from "../../../../components/CButton.vue";

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
    <div class="change__template__container">
        <c-button
            type="common"
            @click="createFromCurrent"
        >
            Загрузить Текущий
        </c-button>
        <c-button
            type="common"
            @click="createEmpty"
        >
            Создать Новый
        </c-button>
    </div>
</template>

<style scoped lang="scss">
@import "src/styles/mixins/position.in.block";

.change__template__container {
    @include centralize-buttons;
}
</style>