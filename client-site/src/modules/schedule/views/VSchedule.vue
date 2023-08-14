<script setup lang="ts">
import '../../../styles/schedule.scss';

import CSchedule from "../components/CSchedule.vue";
import {useStore} from "vuex";

const store = useStore();
store.dispatch('schedule/fetchSchedule');

</script>

<template>
    <div class="schedule" >
        <c-schedule />
    </div>
</template>

<style lang="scss" scoped>

</style>