<script setup lang="ts">

import {LessonTime} from "../../../types/common.types.ts";
import {toRefs} from "vue";
import TrashImage from "../../../assets/trash.svg";

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
    <div :key="lessonTime.order">
        <div>{{lessonTime.order}}</div>
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
        <button
            @click="remove"
        >
            Вычеркнуть
            <img :src="TrashImage" alt="вычеркнуть">
        </button>
    </div>
</template>

<style scoped>

</style>