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

<style scoped>

</style>