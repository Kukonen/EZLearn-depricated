<script setup lang="ts">

import {ScheduleLessonFormatter, ScheduleLessonType} from "../../../types/schedule.types.ts";
import CLink from "../../../components/CLink.vue";
import {getLessonTypeClasses} from "../../../helpers/schedule/getLessonClassNames.helper.ts";
import {translateDayLessonDayTitleBack} from "../../../helpers/schedule/schedule.helper.ts";

const props = defineProps<{
    lesson: ScheduleLessonFormatter;
}>();



</script>

<template>
    <div class="schedule__day__lesson">
        <div class="schedule__day__lesson__name">
            <c-link :path="`/schedule/lesson/${props.lesson.titleId}`">
                {{props.lesson.title}}
            </c-link>
        </div>
        <div :class="getLessonTypeClasses(translateDayLessonDayTitleBack(props.lesson.type))">
            {{props.lesson.type}}
        </div>
        <div class="schedule__day__lesson__professors">
            <c-link
                v-for="(professor, index) in props.lesson.professors"
                :path="`/schedule/lesson/${props.lesson.professorsIds[index]}`">
                {{professor}}
            </c-link>
        </div>
        <div class="schedule__day__lesson__time">
            {{props.lesson.lessonTime}}
        </div>
    </div>
</template>

<style scoped lang="scss">
@import "src/styles/variables";

.schedule__day__lesson {
    display: flex;

    flex-direction: column;

    border-top: 1px solid $light-border-color;
    border-bottom: 1px solid $light-border-color;
    border-radius: 5px;

    gap: 0.7rem;

    padding: 0.7rem;
}

.schedule__day__lesson__name {
    text-align: justify;

    font-size: 1.1rem;
}

.schedule__day__lesson__type {
    font-size: 1rem;

    text-align: start;
}

.schedule__day__lesson__professors {
    display: flex;

    justify-content: right;

    gap: 0.7rem;

    flex-wrap: wrap;

    a {
        border: 1px solid $light-border-color;

        border-radius: 5px;

        padding: 5px 10px;
    }

    font-size: 0.85rem;
}

.schedule__day__lesson__time {
    font-size: 0.85rem;

    text-align: end;
}
</style>