<script setup lang="ts">

import CHeading from "../../../components/CHeading.vue";
import CSelect from "../../../components/CSelect.vue";
import { onMounted, ref } from "vue";
import {ScheduleDayFormatter, ScheduleDayTitle} from "../../../types/schedule.types.ts";
import {translateDayTitle} from "../../../helpers/schedule/schedule.helper.ts";
import {SelectItem} from "../../../types/elemets.ts";
import {useStore} from "vuex";
import CChangeDay from "../components/CChangeDay.vue";
import CButton from "../../../components/CButton.vue";

const store = useStore();

const daysTitles = ref<SelectItem[]>()
const currentDay = ref<string>();

onMounted(() => {
    let daysTitlesNotFormatter:ScheduleDayTitle[] = [
        'MONDAY', 'TUESDAY', 'WEDNESDAY',
        'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'
    ];

    daysTitles.value = daysTitlesNotFormatter.map(dayTitle => {
        return {
            key: dayTitle,
            text: translateDayTitle(dayTitle)
        }
    });

    currentDay.value = daysTitles.value[0].text;

    store.dispatch('scheduleSettings/serializeDays');
})

const selectDay = (key: string, text: string) => {
    currentDay.value = text;

    store.commit('scheduleSettings/setCurrentDayTitle', text)
}

const save = () => {
    store.dispatch('scheduleSettings/updateDays');
}

</script>

<template>
    <c-heading type="LARGE">
        Дни недели
    </c-heading>

    <div class="change__days__heading-select">
        <c-select
            id="days_select"
            :select="selectDay"
            :placeholder="currentDay"
            :selected-items="daysTitles"
        />
    </div>

    <c-change-day />

    <div class="change__days__buttons">
        <c-button type="common" @click="save">
            Сохранить
        </c-button>
    </div>
</template>

<style scoped lang="scss">
@import "src/styles/mixins/position.in.block";

.change__days__heading-select {
    @include centralize-selects;
}

.change__days__buttons {
    @include centralize-buttons;
}

</style>