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
            <img :src="TrashImage" alt="вычеркнуть">
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