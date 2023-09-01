<script setup lang="ts">

import {Lesson} from "../../../types/common.types.ts";
import {toRefs} from "vue";
import TrashImage from "../../../assets/trash.svg";
import CButton from "../../../components/CButton.vue";

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
    <div
        :key="lesson.id"
        class="change__lessons__lesson"
    >
        <input
            type="text"
            placeholder="Название Занятия"
            :value="lesson.title"
            @input="event => lesson.title = event.target.value"
        >
        <c-button
            type="common"
            @click="remove"
        >
            Вычеркнуть
            <img :src="TrashImage" alt="вычеркнуть">
        </c-button>
    </div>
</template>

<style scoped lang="scss">
@import "src/styles/mixins/input";

.change__lessons__lesson {
    @include input-with-button-block;
}

</style>