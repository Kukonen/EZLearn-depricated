<script setup lang="ts">
import CLink from "../../../components/CLink.vue";

</script>

<template>
    <div class="change__navbar">
        <c-link class="change__navbar__link" path="/change/">Базовые настройки</c-link>
        <c-link class="change__navbar__link" path="/change/template">Основные настройки шаблона</c-link>
        <c-link class="change__navbar__link" path="/change/professors">Преподаватели</c-link>
        <c-link class="change__navbar__link" path="/change/lessons">Занятия</c-link>
        <c-link class="change__navbar__link" path="/change/times">Время занятий</c-link>
        <c-link class="change__navbar__link" path="/change/days">Дни недели</c-link>
    </div>

</template>
<style scoped>

</style>