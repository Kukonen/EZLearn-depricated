<script setup lang="ts">
import '../../../styles/change.scss';

import CChangeSidebar from "../components/CChangeSidebar.vue";
import CRouter from "../../../components/CRouter.vue";
import {useStore} from "vuex";

const store = useStore();

store.dispatch('scheduleSettings/collectSchedule')

</script>

<template>
    <div class="change">
        <c-change-sidebar />
        <div class="change__content">
            <c-router />
        </div>
    </div>
</template>

<style scoped>

</style>