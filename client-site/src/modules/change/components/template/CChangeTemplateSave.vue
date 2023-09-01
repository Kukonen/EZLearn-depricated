<script setup lang="ts">

import CHeading from "../../../../components/CHeading.vue";
import {useStore} from "vuex";
import CButton from "../../../../components/CButton.vue";

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
    <div class="change__template__save">
        <c-button type="common" @click="saveInCurrent">
            Сделать Шаблон Текущим Рассписанием
        </c-button>
        <c-button type="common" @click="shareWithCommunity">
            Поделиться с Сообществом
        </c-button>
    </div>
</template>

<style scoped lang="scss">

@import "src/styles/mixins/position.in.block";

.change__template__save {
    @include centralize-buttons;
}

</style>