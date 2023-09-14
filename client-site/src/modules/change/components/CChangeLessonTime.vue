<script setup lang="ts">

import {LessonTime} from "../../../types/common.types.ts";
import {toRefs} from "vue";
import TrashImage from "../../../assets/trash.svg";
import CButton from "../../../components/CButton.vue";

const props = defineProps<{
    lessonTime:LessonTime
    removeLessonTime: (order: number) => void
}>()

const {lessonTime} = toRefs(props);
const {removeLessonTime} = props;

const remove = () => {
    removeLessonTime(lessonTime.value.order);
}

</script>

<template>
    <div
        :key="lessonTime.order"
        class="change__lessons-times__lesson-time"
    >
        <div
            class="change__lessons-times__lesson-time__order"
        >
            {{lessonTime.order}}
        </div>
        <input
            type="time"
            :value="lessonTime.timeStart"
            @input="event => lessonTime.timeStart = event.target.value"
        >
        <input
            type="time"
            :value="lessonTime.timeEnd"
            @input="event => lessonTime.timeEnd = event.target.value"
        >
        <c-button
            type="common"
            @click="remove"
            class="change__lessons-times__lesson-time__remove"
        >
            Вычеркнуть
            <svg width="400" height="400" viewBox="0 0 400 400" stroke="black" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="100" y1="345" x2="300" y2="345" stroke-width="10"/>
                <line x1="49.9694" y1="95.0001" x2="349.964" y2="93.1653" stroke-width="10"/>
                <line x1="54.8983" y1="97.9967" x2="105.898" y2="346.997" stroke-width="10"/>
                <line x1="294.102" y1="345.992" x2="345.123" y2="96.9963" stroke-width="10"/>
                <line x1="145" y1="300" x2="145" y2="150" stroke-width="10"/>
                <line x1="195" y1="300" x2="195" y2="150" stroke-width="10"/>
                <line x1="245" y1="300" x2="245" y2="150" stroke-width="10"/>
                <path d="M107.663 93L125.263 53H280.815L293.215 93H107.663Z" stroke-width="10"/>
            </svg>
<!--            <img :src="TrashImage" alt="вычеркнуть">-->
        </c-button>
    </div>
</template>

<style scoped lang="scss">
@import "src/styles/variables";

.change__lessons-times__lesson-time {
    display: flex;

    margin: auto;
}

.change__lessons-times__lesson-time__order {
    padding: 10px;

    border: 1px solid $light-border-color;
    border-radius: 5px 0 0 5px;
}

.change__lessons-times__lesson-time__remove {
    border-radius: 0 5px 5px 0;
}

.dark {
    .change__lessons-times__lesson-time__order {
        border: 1px solid $dark-border-color;
    }
}

</style>