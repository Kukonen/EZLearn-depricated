<script setup lang="ts">
import CScheduleDay from "./CScheduleDay.vue";
import {useStore} from "vuex";
import {computed} from "vue";

const store = useStore();

const days = computed(() => store.getters["schedule/getDaysFormatter"]);
</script>

<template>
    <c-schedule-day v-for="day in days"
                     :key="day.id"
                     :id="day.id"
                     :title="day.title"
                     :lessons="day.lessons"
    />
</template>

<style scoped>

</style>