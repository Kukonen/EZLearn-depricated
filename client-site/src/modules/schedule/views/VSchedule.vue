<script setup lang="ts">

import {useStore} from "vuex";
import CScheduleDay from "../components/CScheduleDay.vue";
import {computed} from "vue";

const store = useStore();

store.dispatch('schedule/fetchSchedule');

const days = computed(() => store.getters["schedule/getDaysFormatter"]);

</script>

<template>
    <div id="schedule" >
        <c-schedule-day v-for="day in days"
                        :key="day.id"
                        :id="day.id"
                        :title="day.title"
                        :lessons="day.lessons"
        />
    </div>
</template>

<style lang="scss" scoped>

#schedule {
    display: flex;

    justify-content: center;
    flex-wrap: wrap;

    padding: 2rem;

    gap: 2rem;
}

</style>