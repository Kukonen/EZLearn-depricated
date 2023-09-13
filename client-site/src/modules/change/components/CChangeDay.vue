<script setup lang="ts">

import {computed, ref} from "vue";
import CChangeDayLesson from "./template/CChangeDayLesson.vue";
import store from "../../../store";
import CButton from "../../../components/CButton.vue";
import {scheduleMatchLessonTimeBack} from "../../../helpers/schedule/schedule.helper.ts";
import CChangeDayWeek from "./CChangeDayWeek.vue";
import {WeekType} from "../../../types/elemets.ts";

const dayLessons = computed(() => store.getters["scheduleSettings/getDayFromFormatterTitle"])
const orders = computed(() =>
    dayLessons.value?.lessons.map(lesson =>
        scheduleMatchLessonTimeBack(lesson.lessonTime)
    ).filter((order, idx, orders) =>
        orders.findIndex( orderIndex =>
            orderIndex === order
        ) === idx
    )
)

const currentOrder = ref<number>(1);
const currentLesson = computed(() =>
    dayLessons.value?.lessons.findLast(lesson =>
        scheduleMatchLessonTimeBack(lesson.lessonTime) === currentOrder.value &&
        lesson.week.includes(week.value)
    )
)

const week = ref<WeekType>('odd')

const changeWeek = (newWeek: WeekType) => {
    week.value = newWeek;
}

const toggleWeek = () => {
    store.commit('scheduleSettings/toggleWeek', {
        lessonId: currentLesson.value.id
    })
}

const deleteLesson = () => {
    store.commit('scheduleSettings/deleteLesson', {
        lessonId: currentLesson.value.id
    })
}

</script>

<template>
    <div
        class="change__days__lessons__buttons"
    >

        <c-button
            v-if="dayLessons"
            v-for="order in orders"
            :key="order"
            @click="currentOrder = order"
            :type="order === currentOrder ? 'primary' : 'common'"
        >
            {{order}}
        </c-button>
    </div>

    <c-change-day-week
        :week="week"
        :changeWeek="changeWeek"
        :toggleWeek="toggleWeek"
        :deleteLesson="deleteLesson"
    />

    <c-change-day-lesson
        v-if="currentLesson"
        :key="currentLesson"
        :lesson="currentLesson"
    />
</template>

<style scoped lang="scss">

.change__days__lessons__buttons {
    display: flex;

    justify-content: center;

    gap: 1rem;

    padding: 1rem;

    button {
        margin: 0;
    }
}

</style>