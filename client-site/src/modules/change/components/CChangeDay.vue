<script setup lang="ts">

import {computed, onBeforeMount, onMounted, ref} from "vue";
import CChangeDayLesson from "./template/CChangeDayLesson.vue";
import store from "../../../store";
import CButton from "../../../components/CButton.vue";
import {scheduleMatchLessonTimeBack} from "../../../helpers/schedule/schedule.helper.ts";

const dayLessons = computed(() => store.getters["scheduleSettings/getDayFromFormatterTitle"])
const orders = computed(() =>
    dayLessons.value?.lessons.map(lesson =>
        scheduleMatchLessonTimeBack(lesson.lessonTime)
    )
)

const currentOrder = ref<number>(1);

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
    <c-change-day-lesson
        v-if="dayLessons"
        :key="dayLessons.lessons[currentOrder - 1]"
        :lesson="dayLessons.lessons[currentOrder - 1]"
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