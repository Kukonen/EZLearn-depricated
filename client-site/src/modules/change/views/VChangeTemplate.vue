<script setup lang="ts">

import CHeading from "../../../components/CHeading.vue";
import CChangeTemplateCreate from "../components/template/CChangeTemplateCreate.vue";
import CChangeTemplateInformation from "../components/template/CChangeTemplateInformation.vue";
import CChangeTemplateSave from "../components/template/CChangeTemplateSave.vue";
import CChangeTemplateSettings from "../components/template/CChangeTemplateSettings.vue";


</script>

<template>
    <c-heading type="LARGE">
        Настройки шаблона
    </c-heading>

    <c-change-template-create />

    <c-change-template-settings />

    <c-change-template-save />

    <c-change-template-information />
</template>

<style scoped lang="scss">

</style>