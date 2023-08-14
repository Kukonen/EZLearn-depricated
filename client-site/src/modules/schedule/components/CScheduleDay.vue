<script setup lang="ts">
import {ScheduleDayTitle, ScheduleLessonFormatter} from "../../../types/schedule.types.ts";
import CScheduleLesson from "./CScheduleLesson.vue";
import CLink from "../../../components/CLink.vue";
const props = defineProps<{
    id: string
    title: ScheduleDayTitle,
    lessons: ScheduleLessonFormatter[]
}>()

</script>

<template>
    <div class="schedule__day">
        <c-link :path="`/schedule/day/${props.id}`" class="schedule__day__title">
            {{title}}
        </c-link>
        <hr>
        <div class="schedule__day__lessons">
            <c-schedule-lesson v-for="lesson in lessons"
                               :key="lesson.id"
                               :lesson="lesson"
            />
        </div>
    </div>
</template>

<style scoped>

</style>