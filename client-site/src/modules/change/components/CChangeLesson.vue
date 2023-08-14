<script setup lang="ts">

import {Lesson} from "../../../types/common.types.ts";
import {toRefs} from "vue";
import TrashImage from "../../../assets/trash.svg";

const props = defineProps<{
    lesson: Lesson,
    removeLesson: (id: string) => void
}>();

const { lesson } = toRefs(props);
const { removeLesson } = props;

const remove = () => {
    removeLesson(lesson.value.id);
}

</script>

<template>
    <div :key="lesson.id">
        <input
            type="text"
            placeholder="Название Занятия"
            :value="lesson.title"
            @input="event => lesson.title = event.target.value"
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