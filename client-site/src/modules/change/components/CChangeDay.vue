<script setup lang="ts">

import {computed} from "vue";
import CChangeDayLesson from "./template/CChangeDayLesson.vue";
import store from "../../../store";

const day = computed(() => store.getters["scheduleSettings/getDayFromFormatterTitle"])

</script>

<template>
    <c-change-day-lesson
        v-if="day"
        v-for="lesson in day.lessons"
        :key="lesson"
        :lesson="lesson"
    />
</template>

<style scoped>

</style>